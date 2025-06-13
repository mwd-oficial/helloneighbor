const jogos = document.querySelectorAll(".jogos");
const divVideo = document.querySelectorAll(".div-video");
const videos = document.querySelectorAll(".videos")
let iVideo = 0
let divVideosVisiveis = []

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let i = entry.target.dataset.index
        if (entry.isIntersecting) {
            videos[i].play()
            videosFixed[i].play()
        } else {
            videos[i].pause()
            videosFixed[i].pause()
        }
    });
}, {
    threshold: 0.01
});

const observerDivVideo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let i = entry.target.dataset.index
        if (entry.isIntersecting) {
            divVideosVisiveis[i] = true
        } else {
            divVideosVisiveis[i] = false
        }
    });
}, {
    threshold: 0.01
});

window.addEventListener("load", function () {
    jogos.forEach((el, i) => {
        videos[i].currentTime = 0
        videosFixed[i].currentTime = 0
        el.dataset.index = i;
        observer.observe(el);
    })

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
    el.addEventListener("click", function() {
        darPlay(i)
    })
})

playFixed.forEach((el, i) => {
    el.addEventListener("click", function() {
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
    fechar.style.display = "none"
    document.body.style.overflowY = "scroll"

    videosFixed.forEach((el) => {
        if (divVideo[iVideo].offsetTop > window.scrollY && el.style.opacity == 1) el.style.opacity = 0
        el.style.zIndex = "auto"
        el.controls = false
        el.muted = true
        el.volume = 1
        el.playbackRate = 1
    })

    videosFixed[iVideo].play()
    const newTime = videosFixed[iVideo].currentTime + 0.25;
    if (newTime <= videos[iVideo].duration) {
        videos[iVideo].currentTime = newTime;
    }

});

