const jogos = document.querySelectorAll(".jogos");
const divVideo = document.querySelectorAll(".div-video");
const videos = document.querySelectorAll(".videos")
const pageLoader = document.querySelector(".page-loader")
const pCarregandoVideos = document.querySelector("#p-carregando-videos")
let iVideo = 0
let divVideosVisiveis = []
let timeoutPause = []


// URLs HLS públicas do Mux (exemplo)
const hlsUrls = [
    'devgamm',
    'hn-early-prototype',
    'hn-prototype',
    'hn-pre-alpha',
    'hn-alpha1',
    'hn-alpha1.5',
    'hn-alpha2',
    'hn-alpha3',
    'hn-alpha4',
    'hn-beta3',
    'hello-bendy',
    'hello-neighbor',
    'hide-and-seek',
    'secret-neighbor',
    'hello-engineer',
    'hg-prototype',
    'hg-pre-alpha',
    'hn2-alpha1',
    'hn2-alpha1.5',
    'hn2-prototype',
    'hn2-beta',
    'hn2-demo',
    'hello-neighbor2',
    'back-to-school',
    'late-fees',
    'hello-copter',
    'search-and-rescue',
    'nickys-diaries',
    'rbo-prototype',
    'hn3-prototype1',
    'hn3-prototype2',
    'hn3-prototype3',
    'hn-mod-kit',
    'raven-brooks',
    'lqg',
];

// Classe para controlar cada vídeo do fluxo
class VideoController {
    constructor(videoElement, fixedVideo) {
        this.video1 = fixedVideo;
        this.video2 = videoElement;
        this.hls = null;
        this.loaded = false;
        this.timeUpdateBound = false;
        this.isPlaying = false;
        this.chunkCount = 0;
    }

    init(hlsUrl) {
        if (!hlsUrl) return;

        if (Hls.isSupported()) {
            this.hls = new Hls({
                autoStartLoad: false,
                maxBufferLength: 4,
                startFragPrefetch: true
            });

            this.hls.loadSource(`videos/${hlsUrl}/master.m3u8`);
            this.hls.attachMedia(this.video1);
            this.video1.addEventListener('loadedmetadata', () => {
                if (this.video2) {
                    this.video2.srcObject = this.video1.captureStream();
                }
            });

            this.hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
                this.chunkCount++;
                console.log(`[${hlsUrl}] chunks carregadas:`, this.chunkCount);
            });

            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.hls.startLoad(0);
            });;

            this.hls.on(Hls.Events.FRAG_BUFFERED, () => {
                if (!this.loaded) {
                    this.loaded = true;

                    this.hls.stopLoad();
                }
            });
        } else {
            this.video1.src = hlsUrl;
            if (this.video2) this.video2.src = hlsUrl;
            this.loaded = true;
        }
    }

    play() {
        if (!this.hls) return;

        this.hls.startLoad();

        this.video1.play().then(() => {
            this.isPlaying = true;
        }).catch(() => { });

        if (this.video2) {
            this.video2.play().catch(() => { });
        }
    }

    pause() {
        if (this.hls) this.hls.stopLoad();

        this.video1.pause();
        if (this.video2) this.video2.pause();

        this.isPlaying = false;
    }
}

// ===== Pré-carregamento em fila =====
const controllers = [];
let preloadIndex = 0;
pCarregandoVideos.innerHTML = `Carregando vídeos (${preloadIndex}/${hlsUrls.length})`

function preloadNext() {
    if (preloadIndex >= hlsUrls.length) {
        console.log("Preload finalizado");
        pageLoader.style.opacity = 0
        pageLoader.style.visibility = "hidden"
        pageLoader.style.zIndex = -1
        document.body.style.overflowY = "scroll";
        return;
    }

    const videoEl = videos[preloadIndex];
    const fixedVideo = videosFixed[preloadIndex % videosFixed.length]; // se só 1 fixed, sincroniza todos
    const controller = new VideoController(videoEl, fixedVideo);

    controllers.push(controller);

    controller.init(hlsUrls[preloadIndex]);

    preloadIndex++;
    pCarregandoVideos.innerHTML = `Carregando vídeos (${preloadIndex}/${hlsUrls.length})`
    setTimeout(preloadNext, 300); // fila suave
}

// Começa o preload
preloadNext();



let playTimeout = null;
let pendingController = null;
let currentPlaying = null;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const i = entry.target.dataset.index;
        const controller = controllers[i];
        if (!controller) return;

        if (entry.isIntersecting && controller.loaded) {
            if (playTimeout) {
                clearTimeout(playTimeout);
                playTimeout = null;
            }
            pendingController = controller;

            playTimeout = setTimeout(() => {
                // Garante que ainda é o mesmo vídeo esperado
                if (pendingController !== controller) return;
                currentPlaying = controller;
                controller.play()
            }, 250);
        } else if (!entry.isIntersecting) {
            if (!controller.isPlaying) return;
            
            if (pendingController === controller) {
                clearTimeout(playTimeout);
                playTimeout = null;
                pendingController = null;
            }
             if (currentPlaying === controller) {
                controller.pause();
                currentPlaying = null;
            }
            controller.pause();
        }
    });
}, {
    threshold: 0.02
});

jogos.forEach((jogo, index) => {
    jogo.dataset.index = index; // salva o índice no elemento
    observer.observe(jogo);
});


const observerDivVideo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let i = entry.target.dataset.index

        if (entry.isIntersecting) {
            divVideosVisiveis[i] = true
        } else {
            divVideosVisiveis[i] = false
        }
    })
}, {
    threshold: 0.02
});

window.addEventListener("load", function () {
    pageLoader.style.opacity = 1
    pageLoader.style.visibility = "visible"
    pageLoader.style.zIndex = 9999999

    const checkReady = () => {
        if (windowReady) {
            document.body.style.overflowY = "hidden";
        } else {
            requestAnimationFrame(checkReady);
        }
    };

    document.querySelector("#ui-to-top")?.addEventListener("click", () => {
        setTimeout(() => {
            controllers.forEach(c => c.pause())
            console.log("ui to top clicado")
        }, 3000);
    })

    checkReady();

    divVideo.forEach((el, i) => {
        el.dataset.index = i;
        observerDivVideo.observe(el);
    })

    window.addEventListener("scroll", function () {
        const bloqueioFixed = document.querySelector("#bloqueio-fixed")
        if (divVideo[3].offsetTop < window.scrollY) {
            if (!logado) {
                bloqueioFixed.style.display = "flex"
                bloqueioScroll.style.display = "none"
            }
        } else {
            if (!logado) {
                bloqueioFixed.style.display = "none"
                bloqueioScroll.style.display = "flex"
            }
        }
        divVideo.forEach((el, i) => {
            const topPagina = window.scrollY;
            const topDiv = isDesktop ? divVideo[i].offsetTop - 75 : divVideo[i].offsetTop;

            if (topDiv < topPagina) {
                videosFixed[i].style.opacity = 1;
                videos[i].style.opacity = 0
                logoJogos[i].style.opacity = 0
                play[i].style.display = "none"
                if (divVideosVisiveis[i]) {
                    logoJogosFixed[i].style.opacity = 1
                    playFixed[i].style.display = "flex"
                } else {
                    logoJogosFixed[i].style.opacity = 0
                    playFixed[i].style.display = "none"
                }
            } else {
                videosFixed[i].style.opacity = 0;
                videos[i].style.opacity = 1
                logoJogosFixed[i].style.opacity = 0
                logoJogos[i].style.opacity = 1
                playFixed[i].style.display = "none"
                play[i].style.display = "flex"
            }
        })
    });
})

play.forEach((el, i) => {
    el.addEventListener("click", function () {
        darPlay(i)
    })
})

playFixed.forEach((el, i) => {
    el.addEventListener("click", function () {
        darPlay(i)
    })
})

function darPlay(i) {
    document.body.style.overflowY = "hidden"
    fechar.style.display = "block"
    videosFixed[i].style.opacity = 1
    videosFixed[i].style.zIndex = 999
    videosFixed[i].controls = true
    videosFixed[i].muted = false
    iVideo = i
}

fechar.addEventListener("click", function () {
    controllers[iVideo].play();

    fechar.style.display = "none"
    document.body.style.overflowY = "scroll"

    videosFixed.forEach((el) => {
        if (divVideo[iVideo].offsetTop > (window.scrollY + 75) && el.style.opacity == 1) {
            videosFixed[iVideo - 1].style.opacity = 1
            el.style.opacity = 0
        }
        el.style.zIndex = "auto"
        el.controls = false
        el.muted = true
        el.volume = 1
        el.playbackRate = 1
    })
});