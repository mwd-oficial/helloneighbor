const API_URL = "https://helloneighbor.vercel.app"

// URLs HLS de vídeos em jogos.html
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
const jogosNum = document.querySelector("#jogos-num")
const versoesTesteNum = document.querySelector("#versoes-teste-num")
if (jogosNum && versoesTesteNum) {
    let somaNum = Number(jogosNum.innerHTML) + Number(versoesTesteNum.innerHTML) + 3 // 3 do raven-brooks, lqg e hn-mod-kit
    if (somaNum != hlsUrls.length) console.error("Erro disparado por mim mesmo: Número de vídeos cadastrados não correspondem ao número de jogos listados dentro das 3 boxes da tela inicial. Atualize a lista.")
}

const fechar = document.querySelector("#fechar")
const fecharModelo3d = document.querySelector("#fechar-modelo3d")
const fecharCarrossel = document.querySelector("#fechar-carrossel")
const play = document.querySelectorAll(".play")
const playFixed = document.querySelectorAll(".play-fixed")
const videosFixed = document.querySelectorAll(".videos-fixed")
const logoJogos = document.querySelectorAll(".logo-jogos")
const logoJogosFixed = document.querySelectorAll(".logo-jogos-fixed")
const arTutorialDiv = document.querySelector("#ar-tutorial-div")
const setaVoltarTutorial = document.querySelector("#seta-voltar-tutorial")
const setaVoltarAr = document.querySelector("#seta-voltar-ar")
const maximizarBtn = document.querySelector("#maximizar-btn")
const tutorialBtn = document.querySelector("#tutorial-btn")
const arBtn = document.querySelector("#ar-btn")
const playerDiv = document.querySelector("#player-div")
const loader = document.querySelector("#loader")
const animacoes = document.querySelector("#animacoes")
const carrossel = document.querySelector("#carrossel")
const imgCarrossel = document.querySelector("#img-carrossel")
const numImg = document.querySelector("#num-img")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const modelos3dDiv = document.querySelector("#modelos3d-div")
const videosDiv = document.querySelector("#videos-div")
const audiosDiv = document.querySelector("#audios-div")
const imagensDiv = document.querySelector("#imagens-div")
const bloqueioScroll = document.querySelector("#bloqueio-scroll")
const textoDiv = document.querySelector("#texto-div")
const arDiv = document.querySelector("#ar-div")
const tutorialDiv = document.querySelector("#tutorial-div")
const telaCheia = document.querySelector("#tela-cheia")

const divWrapper = document.querySelectorAll(".div-wrapper")
const leiaMaisBtn = document.querySelectorAll(".leia-mais-btn")
const leiaMenosBtn = document.querySelectorAll(".leia-menos-btn")
const leiaMaisEl = document.querySelectorAll(".leia-mais")
let timeoutOverflow, timeoutLeiaMenos

const iconeAnimacoes = document.querySelector("#icone-animacoes")
const animacoesRange = document.querySelector("#animacoes-range")
const rotacao = document.querySelector("#rotacao")
const velocidade = document.querySelector("#velocidade")
let velocidadeValue

const skybox = document.querySelector("#skybox")
let iHdr
let iHdrAntigo = -1
let modeloCarregado = false

let logado = false

if (localStorage.getItem('logado') === 'true') {
    logado = true
    console.log("Você já está logado!");
    document.querySelectorAll(".bloqueio").forEach(el => {
        el.style.display = "none"
    })
    if (bloqueioScroll) bloqueioScroll.style.display = "none"
    document.body.style.cursor = "url('images/default-logado.avif'), auto"
}

const nomeH1 = document.querySelectorAll(".nome-h1")
const apareceP = document.querySelectorAll(".aparece-p")
const hrs = document.querySelectorAll(".hrs")

if (nomeH1[1]) nomeH1[1].style.display = "none"
if (apareceP[1]) apareceP[1].style.display = "none"
if (hrs[1]) hrs[1].style.display = "none"
if (!isDesktop) {
    document.querySelectorAll(".indice").forEach(el => el.querySelectorAll("a").forEach(a => a.classList.add("amarelo")))
    if (arDiv) arDiv.querySelectorAll("a").forEach(a => a.classList.add("amarelo"))
}
if (isDesktop) {
    document.querySelectorAll("footer img").forEach(el => el.classList.add("efeito-hover"))
    document.querySelectorAll(".thumbnail-terry").forEach(el => el.classList.add("efeito-hover"))
    document.querySelectorAll(".btn-danger").forEach(el => el.classList.add("efeito-hover"))
    document.querySelectorAll("#indice a").forEach(el => el.classList.add("efeito-hover"))
    document.querySelectorAll(".swiper-button").forEach(el => el.classList.add("efeito-hover"))
    document.querySelectorAll("input").forEach(el => el.classList.add("efeito-hover"))
    if (maximizarBtn) maximizarBtn.classList.add("efeito-hover")
    if (tutorialBtn) tutorialBtn.classList.add("efeito-hover")
    if (iconeAnimacoes) iconeAnimacoes.classList.add("efeito-hover")
    if (animacoesRange) animacoesRange.classList.add("efeito-hover")
    if (rotacao) rotacao.classList.add("efeito-hover")
    if (velocidade) velocidade.classList.add("efeito-hover")
    if (setaVoltarTutorial) setaVoltarTutorial.classList.add("efeito-hover")
    if (textoDiv) textoDiv.style.paddingBottom = "100px"
    if (telaCheia) {
        telaCheia.classList.add("efeito-hover")
        telaCheia.style.bottom = "40px"
        telaCheia.style.left = "40px"
    }
    if (document.querySelector("#tutorial-video-celular")) document.querySelector("#tutorial-video-celular").style.display = "none"
    let tutorialVideo = document.querySelector("#tutorial-video")
    if (tutorialVideo) {
        tutorialVideo.style.display = "block"
        tutorialVideo.classList.add("efeito-hover")
    }

    document.querySelectorAll("footer > div").forEach(el => el.style.transform = "scale(1)")
    fechar?.classList.add("efeito-hover")
    fecharModelo3d?.classList.add("efeito-hover")
    fecharCarrossel?.classList.add("efeito-hover")
    if (arBtn) arBtn.style.filter = "brightness(0.5)"
    document.querySelector("footer").style.gap = "50px"
    document.querySelectorAll(".secao-botoes").forEach(el => el.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))")
    if (modelos3dDiv) modelos3dDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))"
    if (document.querySelector("#indice-jogos")) document.querySelector("#indice-jogos").style.width = "400px"

    document.querySelectorAll(".div-wrapper p").forEach(el => el.style.fontSize = "15px")
    document.querySelectorAll(".div-wrapper li").forEach(el => el.style.fontSize = "15px")
    document.querySelectorAll(".div-wrapper h1").forEach(el => el.style.fontSize = "45px")
    document.querySelectorAll(".div-wrapper h3").forEach(el => el.style.fontSize = "30px")
    document.querySelectorAll(".div-wrapper h5").forEach(el => el.style.fontSize = "22px")

    document.querySelectorAll(".logo-jogos-fixed").forEach(el => el.style.top = "100px")

    if (prev) prev.classList.add("efeito-hover")
    if (next) next.classList.add("efeito-hover")

    logoJogos.forEach(el => el.style.width = `${el.getBoundingClientRect().width * 1.25}px`)
    logoJogosFixed.forEach(el => el.style.width = `${el.getBoundingClientRect().width * 1.25}px`)

    if (document.querySelector("#loader img")) document.querySelector("#loader img").style.width = "200px"

    const bsi = document.querySelector("#bloqueio-scroll img")
    if (bsi) bsi.style.width = "200px"
    const bsp = document.querySelector("#bloqueio-scroll p")
    if (bsp) bsp.innerHTML = "Faça login para ter acesso a este conteúdo"
    const bfi = document.querySelector("#bloqueio-fixed img")
    if (bfi) bfi.style.width = "200px"
    const bfp = document.querySelector("#bloqueio-fixed p")
    if (bfp) bfp.innerHTML = "Faça login para ter acesso a este conteúdo"

    if (nomeH1[0]) nomeH1[0].style.display = "none"
    if (nomeH1[1]) nomeH1[1].style.display = "block"
    if (apareceP[0]) apareceP[0].style.display = "none"
    if (apareceP[1]) apareceP[1].style.display = "block"
    if (hrs[0]) hrs[0].style.display = "none"
    if (hrs[1]) hrs[1].style.display = "block"

    document.querySelectorAll(".div-wrapper").forEach(el => {
        el.style.width = "80%"
    })

    playConfig(play)
    playConfig(playFixed)
}

function playConfig(playEls) {
    const sombras = document.querySelectorAll(".sombra");

    playEls.forEach((playEl, i) => {
        let hideTimeout;

        const showPlay = () => {
            clearTimeout(hideTimeout);
            playEl.style.opacity = 1;
        };

        const hidePlay = () => {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                // Só esconde se o mouse não estiver no botão ou na sombra
                if (!playEl.matches(':hover')) {
                    playEl.style.opacity = 0;
                }
            }, 2000);
        };

        // Inicializa estado do botão
        playEl.style.opacity = 0;
        playEl.classList.add("efeito-hover");

        // Eventos do botão
        playEl.addEventListener("mouseenter", showPlay);
        playEl.addEventListener("mouseleave", hidePlay);

        // Eventos da sombra
        sombras[i].addEventListener("mousemove", (e) => {
            if (!playEl.contains(e.target)) {
                showPlay();
                hidePlay(); // reinicia o timeout a cada movimento
            }
        });

        sombras[i].addEventListener("mouseleave", hidePlay);
    });
}

let msnry
window.onload = () => {
    setTimeout(() => {
        pointarCursor(document.querySelector("#ui-to-top"))
        const boxIcon = document.querySelectorAll(".box-icon")
        if (boxIcon[0] && isDesktop) {
            let boxIconHeight = boxIcon[2].getBoundingClientRect().height
            boxIcon[0].style.height = boxIconHeight + "px"
            boxIcon[1].style.height = boxIconHeight + "px"
        }
    }, 1000);
    /*
    var grid = document.querySelector('.grid');
    var msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 10
    });
    */
    if (arrayHtml != "index") {
        msnry = new Masonry(imagensDiv, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: 20,
            percentPosition: true
        });
        info(0)
    }
}
document.querySelectorAll("a").forEach(el => {
    pointarCursor(el)
    if (isDesktop) el.onmouseover = () => el.style.color = "#ffbb00"
    el.onmouseout = () => el.style.color = "#fff"
})
document.querySelectorAll(".efeito-hover").forEach(el => {
    pointarCursor(el)
})

function pointarCursor(el) {
    if (isDesktop) {
        if (logado) {
            el.style.cursor = "url('images/pointer-logado.avif'), auto"
        } else {
            el.style.cursor = "url('images/pointer.avif'), auto"
        }
    }
}

function launchFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    telaCheia.style.display = "flex"
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

let divVideoIndex
let algumaVisivel = false
telaCheia.onclick = () => {
    if (document.fullscreenElement) {
        if (typeof divVideosVisiveis !== "undefined") divVideosVisiveis.forEach((dvv, i) => { 
            if (dvv) {
                divVideoIndex = i 
                algumaVisivel = true
            }
        })
        exitFullscreen()
    } else {
        if (typeof divVideosVisiveis !== "undefined") divVideosVisiveis.forEach((dvv, i) => { 
            if (dvv) {
                divVideoIndex = i 
                algumaVisivel = true
            }
        })
        launchFullscreen()
    }
}

document.onfullscreenchange = () => {
    if (document.fullscreenElement) telaCheia.innerHTML = "fullscreen_exit"
    else telaCheia.innerHTML = "fullscreen"
    
    if (typeof divVideo !== "undefined") {
        if (algumaVisivel) {
            divVideo[divVideoIndex].scrollIntoView()
            algumaVisivel = false
        }
    }
}













document.querySelectorAll(".owl-item").forEach(el => {
    el.classList.add("active")
})

let logolp = document.querySelector("#logolp")
let menuAtivo = false
document.querySelectorAll(".rd-navbar-toggle").forEach(el => el.onclick = () => {
    if (window.innerWidth < 750) {
        if (menuAtivo) {
            menuAtivo = false
            logolp.style.opacity = 1
        } else {
            menuAtivo = true
            logolp.style.opacity = 0
        }
    }
})

document.body.onclick = (e) => {
    if (window.innerWidth < 750) {
        if (menuAtivo && !e.target.closest(".rd-navbar-toggle") && !e.target.closest(".rd-navbar-nav")) {
            menuAtivo = false
            logolp.style.opacity = 1
        }
    }
}

let estadoVejaMais = false
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
            if (array.length > 2) {
                e.preventDefault(); // Impede o comportamento padrão do link

                const targetId = this.getAttribute("href")
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    if (targetId == "#imagens") {
                        if (!estadoVejaMais) verMais()

                        const imagensDiv = document.querySelector("#imagens-div").offsetTop
                        window.scrollTo({
                            top: imagensDiv - 100, // Scroll até 200px acima do destino
                            behavior: "smooth"
                        });
                    } else {
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                        const textoContainer = document.querySelector("#texto-container").offsetTop
                        if (isDesktop) {
                            window.scrollTo({
                                top: textoContainer + 85, // Scroll até 200px acima do destino
                                behavior: "smooth"
                            });
                        } else {
                            window.scrollTo({
                                top: textoContainer - 85, // Scroll até 200px acima do destino
                                behavior: "smooth"
                            });
                        }
                    }
                }
            } else {
                e.preventDefault(); // Impede o comportamento padrão do link

                const targetId = this.getAttribute("href")
                const targetElement = document.querySelector(targetId);
                const i = targetId.match(/\d+$/)?.[0]; // extrai "10" corretamente de "#sobre10"


                if (targetElement) {
                    if (this.classList.contains("link-jogos")) {
                        const offsetTop = targetElement.offsetTop;
                        if (isDesktop) {
                            window.scrollTo({
                                top: offsetTop - 75, // Scroll até 200px acima do destino
                                behavior: "smooth"
                            });
                        } else {
                            window.scrollTo({
                                top: offsetTop - 75, // Scroll até 200px acima do destino
                                behavior: "smooth"
                            });
                        }
                    } else {
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                        const topPos = getOffsetTop(divWrapper[i]);
                        window.scrollTo({
                            top: topPos - 100,
                            behavior: "smooth"
                        });
                        //divWrapper[i].scrollIntoView({ behavior: "smooth", block: "start" })
                        // setTimeout(() => {
                        //     window.scrollBy({ top: -50, behavior: "smooth" })
                        //     divWrapper[i].scrollBy({ top: -50, behavior: "smooth" })
                        // }, 500);
                        /*
                        const targetOffset = targetElement.offsetTop
                        divWrapper[i].scrollTo({
                            top: targetOffset + (window.innerHeight * 0.4),
                            behavior: 'smooth', // Para um efeito de rolagem suave
                         });
                         setTimeout(() => {
                             divWrapper[i].scrollIntoView({ behavior: "smooth", block: "start" })
                             setTimeout(() => {
                                 window.scrollBy({
                                     top: -75,
                                     behavior: 'smooth', // Para um efeito de rolagem suave
                                 });
                             }, 200);
                         }, 500);
                         */
                    }
                }
            }
        });
    });
});

function getOffsetTop(element) {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}













document.querySelectorAll(".secao-botoes").forEach(el => {
    // <img src="images/personagens/${p.dir}.avif" alt="">
    if (isDesktop) el.style.gap = "20px"
    array.forEach((p, i) => {
        const botao = `
        <div class="botoes">
            <div class="bloqueio" style="display: none">
                <img src="images/cadeado.avif" alt="">
            </div>
            <img src="images/${arrayHtml}/${p.dir}/${p.dir}.avif" alt="">
            <p class="nome">${p.nome}</p>
        </div>
        `
        el.innerHTML += botao

        setTimeout(() => {
            const botoes = document.querySelectorAll(".botoes")
            if (!logado && i > 2) {
                document.querySelectorAll(".bloqueio")[i].style.display = "flex"
                document.querySelectorAll(".botoes > img")[i].style.filter = "blur(5px) brightness(0.5)"
            } else {
                if (isDesktop) botoes[i].classList.add("efeito-hover")
            }
            if (isDesktop) botoes[i].style.overflow = "hidden"
            pointarCursor(botoes[i])
            botoes[i].onclick = () => {
                if (!logado && i > 2) {
                    alert("Faça login para ter acesso a esse conteúdo!")
                } else {
                    info(i)
                }
            }
        }, 1);
    })
})


const semModelos3d = document.querySelector("#sem-modelos3d")
const semVideos = document.querySelector("#sem-videos")
const semAudios = document.querySelector("#sem-audios")
const semImagens = document.querySelector("#sem-imagens")
const vejaMais = document.querySelector("#veja-mais")
let iArray
function info(indice) {
    iArray = indice

    textoDiv?.scrollTo({
        top: "#sobre" - 200, // Scroll até 200px acima do destino
        behavior: "smooth"
    });
    window.scrollTo({
        top: document.querySelector("#informacao-container")?.offsetTop - 85, // Scroll até 200px acima do destino
        behavior: "smooth"
    });

    lerMenos(0)

    if (document.querySelector("#img-div > img")) document.querySelector("#img-div > img").src = `images/${arrayHtml}/${array[iArray].dir}/${array[iArray].dir}.avif`
    document.querySelectorAll(".nome-h1").forEach(el => el.innerHTML = array[iArray].nome)
    document.querySelectorAll(".aparece-p").forEach(el => el.innerHTML = array[iArray].aparece)
    if (document.querySelector("#previa-div")) document.querySelector("#previa-div > p").innerHTML = array[iArray].previa
    if (document.querySelector("#sobre-div")) document.querySelector("#sobre-div").innerHTML = array[iArray].sobre
    setTimeout(() => {
        document.querySelectorAll("a").forEach(el => {
            pointarCursor(el)
            if (isDesktop) el.onmouseover = () => el.style.color = "#ffbb00"
            el.onmouseout = () => el.style.color = "#fff"
        })
    }, 1);
    if (modelos3dDiv) modelos3dDiv.innerHTML = ""
    if (videosDiv) videosDiv.innerHTML = ""
    if (imagensDiv) imagensDiv.innerHTML = ""
    if (audiosDiv) audiosDiv.innerHTML = ""

    if (array[iArray].qtdeModelos3d) {
        if (semModelos3d) semModelos3d.style.display = "none"
        for (let i = 0; i < array[iArray].qtdeModelos3d; i++) {
            modelos3dDiv.innerHTML += `
            <div class="modelos3d" onclick="abrirModelo3d(${i})">
                <img src="models/${arrayHtml}/${array[iArray].dir}/${i}.avif" alt="">
                <span class="material-symbols-rounded">3d_rotation</span>
            </div>
            `
        }
        setTimeout(() => {
            if (isDesktop) {
                const elements = document.querySelectorAll(".modelos3d");
                elements.forEach(element => {
                    VanillaTilt.init(element, {
                        max: 30,
                        speed: 0
                    });
                    element.classList.add("efeito-hover")
                    pointarCursor(element)
                });
            }
        }, 10);
    } else {
        if (semModelos3d) semModelos3d.style.display = "block"
    }

    if (array[iArray].qtdeVideos) {
        if (semVideos) semVideos.style.display = "none"
        for (let i = 0; i < array[iArray].qtdeVideos; i++) {
            if (videosDiv) videosDiv.innerHTML += `
            <iframe src="${array[iArray].videos[i]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            `
            setTimeout(() => {
                if (isDesktop) {
                    document.querySelectorAll("#videos-div iframe")[i].classList.add("efeito-hover")
                    document.querySelectorAll("#videos-div iframe")[i].style.width = "45%"
                }
            }, 10);
        }
    } else {
        if (semVideos) semVideos.style.display = "block"
    }

    if (array[iArray].qtdeAudios) {
        if (semAudios) semAudios.style.display = "none"
        for (let i = 0; i < array[iArray].qtdeAudios; i++) {
            audiosDiv.innerHTML += `
            <audio preload="auto" src="audios/${arrayHtml}/${array[iArray].dir}/${i}.ogg"></audio>
            <fieldset>
                <legend>${array[iArray].nomeAudios[i]}</legend>
                <div class="audios-btn-range">
                  <span class="material-symbols-outlined icone-audios">play_arrow</span>
                  <div class="audios-range-div">
                    <span class="tempo-atual">00:00</span>
                    <input type="range" min="0" value="0" step="0.000000000000001" class="audios-range">
                    <span class="tempo-total">00:00</span>
                  </div>
                </div>
            </fieldset>
            `
        }

        if (isDesktop) {
            document.querySelectorAll("fieldset").forEach(el => el.style.width = "75%")
            document.querySelectorAll("legend").forEach(el => {
                el.style.fontSize = "18px"
                el.style.margin = "0 10px"
                el.style.padding = "0 5px"
            })
        }

        document.querySelectorAll("audio").forEach((audio, i) => {
            const iconeAudios = document.querySelectorAll(".icone-audios")
            const audiosRange = document.querySelectorAll(".audios-range")
            audio.load(); // força o carregamento do áudio
            audio.addEventListener("canplaythrough", function () {
                configTempoAudio(i);
            }, { once: true }); // garante que só executa uma vez
            audio.onended = () => {
                iconeAudios[i].innerHTML = "play_arrow"
                audiosRange[i].value = 0
                audio.currentTime = 0
                document.querySelectorAll(".tempo-atual")[i].innerHTML = "00:00"
                clearInterval(intervaloAudios)
            }
            if (isDesktop) {
                iconeAudios[i].classList.add("efeito-hover")
                pointarCursor(iconeAudios[i])
                audiosRange[i].classList.add("efeito-hover")
                pointarCursor(audiosRange[i])
            }
        })
    } else {
        if (semAudios) semAudios.style.display = "block"
    }

    if (array[iArray].qtdeImagens) {
        if (semImagens) semImagens.style.display = "none"
        let gridSizer = `<div class="grid-sizer"></div>`
        imagensDiv.innerHTML += gridSizer
        for (let i = 0; i < array[iArray].qtdeImagens; i++) {
            imagensDiv.innerHTML += `<div class="grid-item"><img src="images/${arrayHtml}/${array[iArray].dir}/${i}p.avif" alt=""></div>`
        }
        imagensDiv.style.opacity = 0
        vejaMais.style.display = "none"
        document.querySelector("#loader-img").style.display = "flex"
        if (isDesktop) {
            document.querySelectorAll(".grid-item").forEach(el => el.style.width = "32%")
            document.querySelectorAll(".grid-sizer").forEach(el => el.style.width = "32%")
            document.querySelectorAll(".grid-item>img").forEach((el, i) => {
                el.classList.add("efeito-hover")
                pointarCursor(el)
            })
        }
        document.querySelectorAll(".grid-item>img").forEach((el, i) => {
            el.onclick = () => abrirCarrossel(i)

        })
        imagesLoaded(imagensDiv, function () {
            msnry.reloadItems();
            msnry.layout();
            setTimeout(() => {
                document.querySelector("#loader-img").style.display = "none"
                imagensDiv.style.opacity = 1
                imagensDiv.style.overflowY = "hidden"
                imagensDiv.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
                vejaMais.style.display = "block"
                vejaMais.innerHTML = "Veja mais"
                imagensDiv.style.pointerEvents = "all"
                estadoVejaMais = false
            }, 500);
        })
    } else {
        if (semImagens) {
            semImagens.style.display = "block"
            vejaMais.style.display = "none"
            imagensDiv.style.height = "0px"
        }
    }

    setTimeout(() => {
        textoDiv?.querySelectorAll("p").forEach(el => el.style.fontSize = "15px")
        textoDiv?.querySelectorAll("li").forEach(el => el.style.fontSize = "15px")
        textoDiv?.querySelectorAll("h1").forEach(el => el.style.fontSize = "45px")
        textoDiv?.querySelectorAll("h3").forEach(el => el.style.fontSize = "30px")
        textoDiv?.querySelectorAll("h5").forEach(el => el.style.fontSize = "22px")
    }, 1);
}


vejaMais?.addEventListener("click", verMais)
function verMais() {
    if (estadoVejaMais) {
        imagensDiv.style.overflowY = "hidden"
        vejaMais.innerHTML = "Veja mais"
        estadoVejaMais = false
        imagensDiv.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    } else {
        imagensDiv.style.overflowY = "scroll"
        vejaMais.innerHTML = "Veja menos"
        estadoVejaMais = true
        imagensDiv.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    }
}

let indiceImg = 0
function abrirCarrossel(i) {
    indiceImg = i
    carrossel.style.opacity = 1
    carrossel.style.pointerEvents = "all"
    numImg.innerHTML = `${indiceImg + 1} / ${array[iArray].qtdeImagens}`
    imgCarrossel.src = `images/${arrayHtml}/${array[iArray].dir}/${i}p.avif`
    if (document.querySelector("#ui-to-top")) document.querySelector("#ui-to-top").style.display = "none"
    document.body.style.overflowY = "hidden"
}

prev?.addEventListener("click", function () {
    if (indiceImg > 0) {
        indiceImg--
        imgCarrossel.src = `images/${arrayHtml}/${array[iArray].dir}/${indiceImg}p.avif`
    } else {
        indiceImg = array[iArray].qtdeImagens - 1
        imgCarrossel.src = `images/${arrayHtml}/${array[iArray].dir}/${indiceImg}p.avif`
    }
    numImg.innerHTML = `${indiceImg + 1} / ${array[iArray].qtdeImagens}`
})

next?.addEventListener("click", function () {
    if (indiceImg < array[iArray].qtdeImagens - 1) {
        indiceImg++
        imgCarrossel.src = `images/${arrayHtml}/${array[iArray].dir}/${indiceImg}p.avif`
    } else {
        indiceImg = 0
        imgCarrossel.src = `images/${arrayHtml}/${array[iArray].dir}/${indiceImg}p.avif`
    }
    numImg.innerHTML = `${indiceImg + 1} / ${array[iArray].qtdeImagens}`
})



function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

function isModelViewerSupported() {
    return (
        'customElements' in window &&
        isWebGLAvailable() &&
        window.HTMLCanvasElement &&
        window.WebGLRenderingContext &&
        document.createElement('model-viewer').constructor !== HTMLElement
    );
}



const modelViewerDiv = document.querySelector('#model-viewer-div')
const interacoesContainer = document.querySelector("#interacoes-container")
const modelViewer = document.querySelector("model-viewer")
let iModelo, iAnimacao
function abrirModelo3d(i) {
    if (!isModelViewerSupported()) {
        alert("Seu navegador não é compatível com visualização 3D. Use um navegador mais recente.");
        return
    }

    arDiv.style.opacity = 0
    arDiv.style.pointerEvents = "none"


    modelViewer.onload = modeloCarregou

    loader.style.opacity = 1
    loader.style.pointerEvents = "all"
    modelViewer.style.display = "block"

    modelViewer.src = `models/${arrayHtml}/${array[iArray].dir}/${i}.glb`
    modeloCarregado = false
    efeitoSkybox(true)

    modelViewer.rotationPerSecond = "0deg"
    modelViewer.interactionPromptStyle = "wiggle"

    rotacao.value = 0
    velocidade.value = 1

    animacoes.innerHTML = ""
    iAnimacao = 0
    array[iArray].modelos3d[i].forEach((animacao, ianim) => {
        let opt = document.createElement("option")
        animacoes.appendChild(opt)
        opt.innerHTML = animacao.nome
        opt.value = ianim
    })

    modelViewerDiv.style.opacity = 1;
    modelViewerDiv.style.pointerEvents = "all";
    fecharModelo3d.style.display = "block"
    if (document.querySelector("#ui-to-top")) document.querySelector("#ui-to-top").style.display = "none"
    document.body.style.overflowY = "hidden"

    if (isDesktop) {
        let rect = document.querySelector("#animacoes-rotacao-div").getBoundingClientRect()
        playerDiv.style.width = `calc(100% - ${rect.width}px - 100px)`
    }

    if (array[iArray].modelos3d[i].length == 1) {
        if (array[iArray].modelos3d[i][0].src) {
            playerDiv.style.display = "flex"
            document.querySelector("#velocidade-div").style.display = "flex"
        } else {
            playerDiv.style.display = "none"
            document.querySelector("#velocidade-div").style.display = "none"
        }
        document.querySelector("#animacoes-div").style.display = "none"
    } else {
        document.querySelector("#animacoes-div").style.display = "flex"
        document.querySelector("#velocidade-div").style.display = "flex"
        playerDiv.style.display = "flex"
    }

    if (iModelo == i) {
        modeloCarregou()
        return
    }

    iModelo = i
}

let intervaloModeloPronto
fecharModelo3d?.addEventListener("click", function () {
    document.querySelectorAll("video").forEach(video => {
        video.pause()
        video.currentTime = 0
    })
    setTimeout(() => {
        modelViewer.style.display = "none"
    }, 250);
    modelViewerDiv.style.opacity = 0;
    modelViewerDiv.style.pointerEvents = "none";
    modelViewer.style.opacity = 0
    tutorialDiv.style.opacity = 0;
    tutorialDiv.style.pointerEvents = "none";
    setaVoltarTutorial.style.opacity = 0;
    setaVoltarTutorial.style.pointerEvents = "none";
    arDiv.style.opacity = 0;
    arDiv.style.pointerEvents = "none";
    arTutorialDiv.style.opacity = 0
    loader.style.opacity = 0
    loader.style.pointerEvents = "none"
    setaVoltarAr.style.opacity = 0;
    setaVoltarAr.style.pointerEvents = "none";
    interacoesContainer.style.opacity = 0
    fecharModelo3d.style.display = "none"
    if (document.querySelector("#ui-to-top")) document.querySelector("#ui-to-top").style.display = "block"
    document.body.style.overflowY = "scroll"
    modeloPronto = false
    clearInterval(intervaloModeloPronto)
})

fecharCarrossel?.addEventListener("click", function () {
    carrossel.style.opacity = 0
    carrossel.style.pointerEvents = "none"
    fecharCarrossel.style.display = "none"
    if (document.querySelector("#ui-to-top")) document.querySelector("#ui-to-top").style.display = "block"
    document.body.style.overflowY = "scroll"
})


const tempoTotalAnimacoes = document.querySelector("#tempo-total-animacoes")
const tempoAtualAnimacoes = document.querySelector("#tempo-atual-animacoes")

function modeloCarregou() {
    modeloCarregado = true
    console.log(modelViewer.availableAnimations)
    configModel()

    if (array[iArray].modelos3d[iModelo][0].src) configTempo()

    setTimeout(() => {
        modelViewer.style.opacity = 1
        interacoesContainer.style.opacity = 1
        arTutorialDiv.style.opacity = 1
        loader.style.opacity = 0
        loader.style.pointerEvents = "none"
    }, 1000);
}

modelViewer?.addEventListener('environment-change', () => {
    if (modeloCarregado) {
        loader.style.opacity = 0
        loader.style.pointerEvents = "none"
    }
});

let intervaloAnimacoes
function configTempo() {
    modelViewer.currentTime = 0
    iconeAnimacoes.innerHTML = "pause"

    modelViewer.animationName = array[iArray].modelos3d[iModelo][iAnimacao].src
    modelViewer.timeScale = array[iArray].modelos3d[iModelo][0]?.speed ?? 1
    modelViewer.play()

    document.querySelector("#velocidade-div span").innerHTML = "1"
    velocidade.value = 1
    velocidadeValue = modelViewer.timeScale


    // Pega a duração da animação e define no mostrador
    let minutos = Math.floor(modelViewer.duration / 60);
    let segundos = Math.floor(modelViewer.duration - minutos * 60);
    tempoTotalAnimacoes.innerHTML = (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);

    animacoesRange.max = modelViewer.duration

    // Pega o tempo atual da animação e atualiza o mostrador toda vez que o tempo andar (timeupdate não funciona com model viewer)
    clearInterval(intervaloAnimacoes)
    if (modelViewerDiv.style.opacity == 1) intervaloAnimacoes = setInterval(contadorAnimacoes, 1)


    // Atualiza o tempo atual da animação quando o usuário mudar no range
    animacoesRange.oninput = () => {
        modelViewer.timeScale = 1
        modelViewer.pause()
        modelViewer.currentTime = animacoesRange.value;
    }
    animacoesRange.onmouseup = () => {
        if (iconeAnimacoes.innerHTML == "pause") modelViewer.play()
        modelViewer.timeScale = velocidadeValue
    }
    animacoesRange.ontouchend = () => {
        if (iconeAnimacoes.innerHTML == "pause") modelViewer.play()
        modelViewer.timeScale = velocidadeValue
    }

    iconeAnimacoes.onclick = playPauseAnimacao
}

function contadorAnimacoes() {
    animacoesRange.value = modelViewer.currentTime;
    let minutos = Math.floor(modelViewer.currentTime / 60);
    let segundos = Math.floor(modelViewer.currentTime - minutos * 60);
    tempoAtualAnimacoes.innerHTML = (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);
}

function configModel() {
    let animacao = array[iArray].modelos3d[iModelo][iAnimacao]
    modelViewer.rotationPerSecond = "0deg"
    modelViewer.resetTurntableRotation()

    modelViewer.cameraTarget = animacao?.target ?? "0 0 0"
    modelViewer.cameraOrbit = animacao?.orbit
    modelViewer.minCameraOrbit = animacao?.minOrbit ?? array[iArray].modelos3d[iModelo][0]?.minOrbit
    modelViewer.maxCameraOrbit = animacao?.maxOrbit ?? array[iArray].modelos3d[iModelo][0]?.maxOrbit
    modelViewer.timeScale = array[iArray].modelos3d[iModelo][0]?.speed ?? 1
}

function playPauseAnimacao() {
    if (!modelViewer.paused) {
        iconeAnimacoes.innerHTML = "play_arrow"
        modelViewer.pause()
    } else {
        iconeAnimacoes.innerHTML = "pause"
        modelViewer.play()
    }
}

function configTempoAudio(i) {
    const audios = document.querySelectorAll("audio")
    const iconeAudios = document.querySelectorAll(".icone-audios")
    const audiosRange = document.querySelectorAll(".audios-range")

    // Pega a duração da animação e define no mostrador
    let minutos = Math.floor(audios[i].duration / 60);
    let segundos = Math.floor(audios[i].duration - minutos * 60);
    document.querySelectorAll(".tempo-total")[i].innerHTML = (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);

    audiosRange[i].max = audios[i].duration

    // Atualiza o tempo atual da animação quando o usuário mudar no range
    audiosRange[i].oninput = () => {
        audios[i].pause()
        audios[i].currentTime = audiosRange[i].value;
    };
    audiosRange[i].onmouseup = () => {
        if (iconeAudios[i].innerHTML == "pause") audios[i].play()
    }
    audiosRange[i].ontouchend = () => {
        if (iconeAudios[i].innerHTML == "pause") audios[i].play()
    }

    iconeAudios[i].onclick = () => playPauseAudio(i)
}

let intervaloAudios
function playPauseAudio(i) {
    const audios = document.querySelectorAll("audio")
    const iconeAudios = document.querySelectorAll(".icone-audios")
    const audiosRange = document.querySelectorAll(".audios-range")
    audios.forEach(audio => {
        if (audio != audios[i]) audio.pause()
        if (audio != audios[i]) audio.currentTime = 0
    })
    iconeAudios.forEach(el => el.innerHTML = "play_arrow")
    audiosRange.forEach((el, ir) => {
        if (ir != i) el.value = 0
    })
    if (!audios[i].paused) {
        iconeAudios[i].innerHTML = "play_arrow"
        audios[i].pause()
        clearInterval(intervaloAudios)
    } else {
        iconeAudios[i].innerHTML = "pause"
        audios[i].play()
        clearInterval(intervaloAudios)
        intervaloAudios = setInterval((() => contadorAudios(i)), 1)
    }
}

function contadorAudios(i) {
    const audiosRange = document.querySelectorAll(".audios-range")
    const audios = document.querySelectorAll("audio")
    audiosRange[i].value = audios[i].currentTime;
    let minutos = Math.floor(audios[i].currentTime / 60);
    let segundos = Math.floor(audios[i].currentTime - minutos * 60);
    document.querySelectorAll(".tempo-atual")[i].innerHTML = (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);
}

maximizarBtn?.addEventListener("click", function () {
    if (maximizarBtn.querySelector("span").innerHTML == "close_fullscreen") {
        maximizarBtn.querySelector("span").innerHTML = "open_in_full"
        maximizarBtn.style.opacity = 1
        fecharModelo3d.style.display = "flex"
        tutorialBtn.style.display = "flex"
        arBtn.style.display = "flex"
        interacoesContainer.style.display = "flex"
        requestAnimationFrame(() => {
            fecharModelo3d.style.opacity = 1
            tutorialBtn.style.opacity = 1
            arBtn.style.opacity = 1
            interacoesContainer.style.opacity = 1
        })
    } else {
        maximizarBtn.querySelector("span").innerHTML = "close_fullscreen"
        maximizarBtn.style.opacity = 0.25
        fecharModelo3d.style.opacity = 0
        tutorialBtn.style.opacity = 0
        arBtn.style.opacity = 0
        interacoesContainer.style.opacity = 0
        setTimeout(() => {
            fecharModelo3d.style.display = "none"
            tutorialBtn.style.display = "none"
            arBtn.style.display = "none"
            interacoesContainer.style.display = "none"
        }, 500);
    }
})

tutorialBtn?.addEventListener("click", function () {
    tutorialDiv.style.opacity = 1
    tutorialDiv.style.pointerEvents = "all"
    setaVoltarTutorial.style.opacity = 1;
    setaVoltarTutorial.style.pointerEvents = "all";
    interacoesContainer.style.opacity = 0
    arTutorialDiv.style.opacity = 0

    tutorialDiv.scrollTo(0, 0)
})

setaVoltarTutorial?.addEventListener("click", function () {
    tutorialDiv.style.opacity = 0
    tutorialDiv.style.pointerEvents = "none"
    setaVoltarTutorial.style.opacity = 0;
    setaVoltarTutorial.style.pointerEvents = "none";
    interacoesContainer.style.opacity = 1
    arTutorialDiv.style.opacity = 1
    document.querySelectorAll("video").forEach(video => {
        video.pause()
        video.currentTime = 0
    })
    setTimeout(() => {
        if (isDesktop) document.querySelector("#play-tutorial").style.display = "flex"
    }, 250);
})





let irArBtn = document.querySelector("#ir-ar-btn")
let url
let modeloPronto = false

arBtn?.addEventListener("click", async function () {
    if (isDesktop) {
        alert("A visualização no modo AR está disponível apenas para celulares.")
        return
    }

    if (!/Android/i.test(navigator.userAgent)) {
        alert("O modo AR funciona apenas em dispositivos Android.")
        return
    }

    if (array[iArray].modelos3d[iModelo][0].temAr) {
        console.log("tem ar")
        const timestamp = new Date().toISOString();
        arDiv.style.opacity = 1
        arDiv.style.pointerEvents = "all"
        setaVoltarAr.style.opacity = 1
        setaVoltarAr.style.pointerEvents = "all"
        interacoesContainer.style.opacity = 0
        arTutorialDiv.style.opacity = 0

        arDiv.scrollTo(0, 0)

        let animado = false
        if (array[iArray].modelos3d[iModelo][0].src) animado = true

        document.querySelector("#target-p").innerHTML = `${animado ? "Animação" : "Modelo 3D"} ter o ponto central próximo de 0m 0m 0m (recomendado). Quanto maiores esses números, mais longe do centro o modelo 3D pode aparecer, e você pode precisar procurar ao seu redor para encontrá-lo. <br>Animação: ${array[iArray].modelos3d[iModelo][iAnimacao].nome || (animado ? "Padrão" : "Nenhuma")}<br>Ponto central: ${array[iArray].modelos3d[iModelo][iAnimacao].target || "0m 0m 0m"}`
        if (array[iArray].modelos3d[iModelo].length > 1) {
            console.log("tem mais de 1 animação")
            try {
                const res = await axios.post(`${API_URL}/ar/cadastrar`, {
                    username: "Anônimo",
                    src: modelViewer.src,
                    nome: `${array[iArray].dir}`,
                    nomeAnimacao: array[iArray].modelos3d[iModelo][iAnimacao].nome,
                    animacao: array[iArray].modelos3d[iModelo][iAnimacao].src,
                    timestamp: timestamp
                });
                setTimeout(() => {
                    url = res.data.blobUrl
                    modeloPronto = true
                }, 1000);
            } catch (e) {
                alert("Um erro ocorreu ao tentar entrar no modo AR.")
                return
            }
        } else {
            console.log("é estatico, apenas 1 animação")
            try {
                const res = await axios.post(`${API_URL}/ar/cadastrar`, {
                    username: dadosUser.username || "Anônimo",
                    src: modelViewer.src,
                    nome: nomeModelo.innerHTML,
                    timestamp: timestamp
                });
                setTimeout(() => {
                    url = res.data.blobUrl
                    modeloPronto = true
                }, 1000);
            } catch (e) {
                console.log("Um erro ocorreu ao tentar cadastrar modelo estático.")
                return
            }
        }
    } else {
        alert("Esse modelo 3D não está disponível para o modo AR.")
    }
})

irArBtn?.addEventListener("click", function () {
    if (modeloPronto) {
        acessarAr()
    } else {
        loader.style.opacity = 1
        loader.style.pointerEvents = "all"
        intervaloModeloPronto = setInterval(() => {
            if (arDiv.style.opacity == 0) {
                clearInterval(intervaloModeloPronto);
                modeloPronto = false;
                return
            }
            if (modeloPronto) {
                clearInterval(intervaloModeloPronto);
                setTimeout(acessarAr, 500)
            }
        }, 50);
    }
})

function acessarAr() {
    let sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(url)}&mode=ar_only&resizable=true`;
    loader.style.opacity = 0
    loader.style.pointerEvents = "none"
    window.location.href = sceneViewerUrl;
}

setaVoltarAr?.addEventListener("click", function () {
    arDiv.style.opacity = 0
    arDiv.style.pointerEvents = "none"
    loader.style.opacity = 0
    loader.style.pointerEvents = "none"
    setaVoltarAr.style.opacity = 0
    setaVoltarAr.style.pointerEvents = "none"
    interacoesContainer.style.opacity = 1
    arTutorialDiv.style.opacity = 1
    document.querySelectorAll("video").forEach(video => {
        video.pause()
        video.currentTime = 0
    })
})



animacoes?.addEventListener("input", function () {
    modeloPronto = false
    iAnimacao = animacoes.value
    let animacao = array[iArray].modelos3d[iModelo][iAnimacao]
    modelViewer.animationName = animacao.src
    configModel()
    configTempo()
})


rotacao?.addEventListener("input", function () {
    modelViewer.rotationPerSecond = rotacao.value + "deg"
    if (rotacao.value > 0) {
        modelViewer.interactionPromptStyle = "basic"
    } else {
        modelViewer.interactionPromptStyle = "wiggle"
    }
})

velocidade?.addEventListener("input", function () {
    velocidadeValue = (array[iArray].modelos3d[iModelo][0]?.speed ?? 1) * Number(velocidade.value);
    modelViewer.timeScale = velocidadeValue
    document.querySelector("#velocidade-div span").innerHTML = velocidade.value
})


document.querySelector("#skybox-p")?.addEventListener("click", () => efeitoSkybox(!skybox.classList.contains("active")))
skybox?.addEventListener("click", () => efeitoSkybox(!skybox.classList.contains("active")))
function efeitoSkybox(estado) {
    if (estado) {
        do {
            iHdr = Math.floor(Math.random() * 10)
        } while (iHdr == iHdrAntigo)
        iHdrAntigo = iHdr
        skybox.classList.add("active");
        modelViewer.skyboxImage = `images/hdr/hdr${iHdr}.avif`
        modelViewer.environmentImage = "images/hdr/branco.avif"
        loader.style.opacity = 1
        loader.style.pointerEvents = "all"
    } else {
        skybox.classList.remove("active");
        modelViewer.skyboxImage = ""
        modelViewer.environmentImage = "neutral"
    }
}


leiaMaisBtn.forEach((el, i) => {
    el.onclick = () => {
        clearTimeout(timeoutOverflow)
        clearTimeout(timeoutLeiaMenos)
        leiaMaisEl[i].style.display = "block"
        el.style.opacity = 0
        leiaMenosBtn[i].style.display = "block"
        leiaMenosBtn[i].style.opacity = 1
        if (divWrapper[i]) {
            divWrapper[i].style.overflowY = "scroll"
            divWrapper[i].scrollBy({
                top: 250,
                behavior: 'smooth'
            });
        }
        if (textoDiv) textoDiv.style.overflowY = "scroll"
        setTimeout(() => {
            leiaMaisEl[i].style.opacity = 1
        }, 1);
    }
})

leiaMenosBtn.forEach((el, i) => {
    el.onclick = () => {
        lerMenos(i)
    }
})

function lerMenos(i) {
    if (divWrapper[i]) divWrapper[i].scrollTo({ top: 0, behavior: 'smooth' });
    if (textoDiv) textoDiv.scrollTo({ top: 0, behavior: 'smooth' });
    leiaMaisEl[i].style.opacity = 0
    leiaMenosBtn[i].style.opacity = 0
    leiaMaisBtn[i].style.display = "block"
    setTimeout(() => {
        leiaMaisBtn[i].style.opacity = 1
    }, 1);
    timeoutLeiaMenos = setTimeout(() => {
        leiaMaisEl[i].style.display = "none"
        leiaMenosBtn[i].style.display = "none"
        timeoutOverflow = setTimeout(() => {
            if (divWrapper[i]) divWrapper[i].style.overflowY = "hidden"
            if (textoDiv) textoDiv.style.overflowY = "hidden"
        }, 1000);
    }, 500);
}

leiaMaisBtn.forEach(el => {
    el.onmouseleave = () => el.style.backgroundColor = "#fff !important"
})

leiaMenosBtn.forEach(el => {
    el.onmouseleave = () => el.style.backgroundColor = "#fff !important"
})


let tutorialVideo = document.querySelector("#tutorial-video")
if (tutorialVideo) {
    tutorialVideo.onclick = () => document.querySelector("#play-tutorial").style.display = "none"
}

// Atalho
function t(x, y, z) {
    modelViewer.cameraTarget = `${x}m ${y}m ${z}m`
}
function o(x, y) {
    modelViewer.cameraOrbit = `${x}deg ${y}deg 0`
}
function n(z) {
    modelViewer.minCameraOrbit = `0 0 ${z}m`
}
function x(z) {
    modelViewer.maxCameraOrbit = `0 0 ${z}m`
}
