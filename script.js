console.log('Let write javascript.')

let audio;
let songs;
let currentSongIndex = 0;
const nextSong = document.getElementById("nextSong");
const previousSong = document.getElementById("previousSong");
let songname = document.getElementById("songname");
let time = document.getElementById("time");

async function getSongs() {
    if (songs && songs.length > 0) return songs;
    const res = await fetch("./songs.json");
    songs = await res.json();
    return songs;
}

async function play() {
    await getSongs();
    if (!audio) {
        audio = new Audio(songs[currentSongIndex])
        attachTimeUpdate()
    }
    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();
    if (src === "play.svg") {
        pause.src = "images/pause.svg"
        await audio.play()
    }
    else if (src === "pause.svg") {
        audio.pause();
        pause.src = "images/play.svg"
        return;
    }
    else {
        pause.src = "images/play.svg"
    }
    let songa = songs[currentSongIndex].split("/").pop()
    songname.innerHTML = `<span>${songa.replace(".mp3", "").replaceAll("%20", " ")}</span>`
}

function mute() {
    let pause = document.querySelector(".mute");
    let src = pause.src.split("/").pop();
    if (src === "volume.svg") {
        pause.src = "images/mute.svg";
    } else if (src === "mute.svg") {
        pause.src = "images/volume.svg";
    } else {
        pause.src = "images/volume.svg";
    }
}

nextSong.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;

    let getsongname = songs[currentSongIndex].split("/").pop()
    songname.innerHTML = `<span>${getsongname.replace(".mp3", "").replace(".m4a", "").replaceAll("%20", " ")}</span>`

    playSong(songs[currentSongIndex]);
});

previousSong.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    let songame = songs[currentSongIndex].split("/").pop()
    songname.innerHTML = `<span>${songame.replace(".mp3", "").replace(".m4a", "").replaceAll("%20", " ")}</span>`

    playSong(songs[currentSongIndex]);
})

async function playSong(song) {
    try {
        audio.src = song;
        await audio.play();
    }
    catch (error) {
        console.log("Error playing song:", error);
    };
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function attachTimeUpdate() {
    audio.addEventListener("timeupdate", () => {
        if (!isNaN(audio.duration)) {
            const current = formatTime(audio.currentTime);
            const total = formatTime(audio.duration);
            time.textContent = `${current} / ${total}`;
        } else {
            time.textContent = "00:00 / 00:00";
        }
    });

    audio.addEventListener("ended", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        let nextSongName = songs[currentSongIndex].split("/").pop();
        songname.innerHTML = `<span>${nextSongName.replace(".mp3", "").replaceAll("%20", " ")}</span>`;

        audio.src = songs[currentSongIndex];
        audio.play().catch(err => console.error("Auto-play error:", err));

        let pause = document.querySelector(".play");
        if (pause) pause.src = "images/pause.svg";
    });
}

function showAll(sectionClass) {
    const card = document.querySelector(`.${sectionClass} .card,
         .${sectionClass} .popularcards, 
         .${sectionClass} .circle, 
         .${sectionClass} .radiocards, 
         .${sectionClass} .chartscards, 
         .${sectionClass} .impcards`);
    if (card) {
        card.style.display = "flex";
        card.style.flexWrap = "wrap";
        card.style.gap = "25px";
    }
    const showAllBtn = document.querySelector(`.${sectionClass} .showall`);
    if (showAllBtn) showAllBtn.style.display = "none";

    const allSections = ['trending', 'popularsongs', 'popularartist', 'popularradio', 'featured', 'Indian_Music_Playlist'];

    allSections.forEach(sec => {
        if (sec !== sectionClass) {
            const section = document.querySelector(`.${sec}`);
            if (section) section.style.display = "none";
        }
    });
}

async function trending() {
    let trendingsongs = await fetch("./TrendingSongs.json")
    let data = await trendingsongs.json()
    let card = document.querySelector(".card")
    let html = ""
    data.forEach(rendering => {
        html += `<div class="song-card">
    <img src="${rendering.image}"  alt="">
    <div class="green"><img src="images/green.svg" alt=""></div>
    <div class="flex2">
    <h2 class="text2">${rendering.song}</h2>
    <p class="text2">${rendering.artist}</p>
    </div>
    </div>
`
    })
    card.innerHTML += html
}
trending()

async function circle() {
    let artist = await fetch("./Artist.json")
    let data = await artist.json()
    let circle = document.querySelector(".circle")
    let html = ""
    data.forEach(rendering1 => {
        html += `<div class="circle-card">
    <img src="${rendering1.image}" alt="Artist">
    <div class="green"><img src="images/green.svg" alt=""></div>
    <div class="flex2">
    <p class="">Artist</p>
    </div>
   </div>
`
    })
    circle.innerHTML += html
}
circle()

async function popular() {
    let popularsongs = await fetch("./Popular.json")
    let data = await popularsongs.json()
    let popularcards = document.querySelector(".popularcards")
    data.forEach(rendering2 => {
        popularcards.innerHTML += `<div class="popular-card">
    <img src="${rendering2.image}" alt="">
    <div class="green"><img src="images/green.svg" alt=""></div>
    <div class="flex2">
    <h2 class="text2">${rendering2.song}</h2>
    <p class="text2">${rendering2.artist}</p>
    </div>
    </div>
`
    })
}
popular()

setTimeout(() => {
    async function radio() {
        let radiostations = await fetch("./PopularRadio.json")
        let data = await radiostations.json()
        let radiocards = document.querySelector(".radiocards")
        data.forEach(rendering3 => {
            radiocards.innerHTML += `<div class="radio-card">
            <img src="${rendering3.image}" alt="">
            <div class="green"><img src="images/green.svg" alt=""></div>
            <div class="flex2">
            <p class="">${rendering3.collaborators}</p>
            </div>
            </div>
            `
        })
    }
    radio()
}, 2000)

setTimeout(() => {
    async function charts() {
        let charts = await fetch("./FeaturedCards.json")
        let data = await charts.json()
        let chartscards = document.querySelector(".chartscards")
        data.forEach(rendering4 => {
            chartscards.innerHTML += `<div class="charts-card">
            <img src="${rendering4.image}" alt="">
            <div class="green"><img src="images/green.svg" alt=""></div>
            <div class="flex2">
            <p class="">${rendering4.description}</p>
            </div>
            </div>
            `
        })
    }
    charts()
}, 3000)

setTimeout(() => {
    async function imp() {
        let imp = await fetch("./indian_music_playlists.json")
        let data = await imp.json()
        let impcards = document.querySelector(".impcards")
        data.forEach(rendering5 => {
            impcards.innerHTML += `<div class="imp-card">
    <img src="${rendering5.image}" alt="">
    <div class="green"><img src="images/green.svg" alt=""></div>
    <div class="flex2">
    <p class="">${rendering5.description}</p>
    </div>
    </div>
`
        })
    }
    imp()
}, 4000)

document.addEventListener("DOMContentLoaded", () => {

    const wrappers = document.querySelectorAll('.trending-scroll-wrapper');
    wrappers.forEach(wrapper => {

        const leftArrow = wrapper.querySelector('.leftarrow');
        const rightArrow = wrapper.querySelector('.rightarrow');

        const scrollContainer = wrapper.querySelector('.card-container');
        const scrollAmount = 300;
        if (!scrollContainer) return;
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
});

const seekbar = document.querySelector(".seekbar");
const filled = seekbar.querySelector(".white");
const thumb = seekbar.querySelector(".moveable");