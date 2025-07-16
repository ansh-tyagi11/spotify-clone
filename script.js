console.log('Let write javascript')

let audio;
let songs;

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href)
        }
    }
    return songs
}
getSongs()
// async function getSongs() {
//     let songs = [
//         "songs/Jugrafiya.m4a",
//         "songs/Jugrafiya2.m4a",
//         "songs/Jugrafiya3.m4a"
//     ]
//     return songs
// }

// getSongs()


async function main() {
    // Get the list of all songs
    let songs = await getSongs()
    // console.log(songs)
    // to play the first song
    audio = new Audio(songs[0]);
}

async function play() {
    // It will helps to play the song on click it we are not using this due to single thread structure of javascript only one function will run at one time either it is main() or play() in this case only play function will run
    if (!audio) {
        await main(); // Only initialize audio once
    }
    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop(); // This gives "play.svg" or "pause.svg"
    if (src === "play.svg") {
        pause.src = "images/pause.svg";
        audio.play()
    } else if (src === "pause.svg") {
        pause.src = "images/play.svg";
        audio.pause()
    } else {
        pause.src = "images/play.svg";
    }
}

function mute() {
    // await play()
    let pause = document.querySelector(".mute");
    let src = pause.src.split("/").pop(); // This gives "play.svg" or "pause.svg"
    if (src === "volume.svg") {
        pause.src = "images/mute.svg";
    } else if (src === "mute.svg") {
        pause.src = "images/volume.svg";
    } else {
        pause.src = "images/volume.svg";
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     const playButton = document.querySelector(".play");

//     playButton.addEventListener("click", () => {
//         const currentSrc = playButton.src.split("/").pop(); // Get just the filename

//         if (currentSrc === "play.svg") {
//             playButton.src = "images/pause.svg";
//         } else {
//             playButton.src = "images/play.svg";
//         }
//     });
// });
/*- playButton.src
- This gets the full URL of the image.
- Example:
If your image is <img src="images/play.svg">,
then playButton.src might return something like:
http://localhost:5500/images/play.svg
- .split("/")
- This splits the URL string into an array using / as the separator.
- Example:
"http://localhost:5500/images/play.svg".split("/")
// → ["http:", "", "localhost:5500", "images", "play.svg"]
- .pop()
- - This takes the last item from the array — which is the filename.
- In this case: "play.svg"
- const currentSrc = ...
- Stores the result ("play.svg") in the variable currentSrc.*/

async function nextSong() {
    await getSongs()
    let i = +1
    audio = new Audio(songs[i + 1]);
    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();
    if (src === "play.svg") {
        pause.src = "images/pause.svg";
        console.log(audio)
        return audio.play()
    }
    else {
        pause.src = "images/pause.svg";
    }
    return
}

async function previousSong() {
    await main()
    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();
    if (src === "play.svg") {
        pause.src = "images/pause.svg";
        return audio.play()
    }
    else {
        pause.src = "images/pause.svg";
    }
    return
}

function showAll() {
    let show = document.querySelector(".trending");
    show.style.flexDirection = "column";
    show.style.display = "flex";
    let showall = document.querySelector(".showall");
    showall.style.display = "none";
    // let heading = document.getElementsByClassName(".heading");
    // console.log(heading.innerHTML)
    //heading.style.display = "none";
}

// ---------------------------------------------------DYNAMICALLY ADDING CONTENT---------------------------------------------------

async function trending() {
    let trendingsongs = await fetch("TrendingSongs.json")
    let data = await trendingsongs.json()
    let card = document.querySelector(".card")
    data.forEach(rendering => {
        card.innerHTML += `<div class="song-card">
                <img src="${rendering.image}" alt="">
                <div class="green"><img src="images/green.svg"></div>
                <div class="flex2">
                    <h2 class="text2">${rendering.song}</h2>
                    <p class="text2">${rendering.artist}</p>
                </div>
            </div>
`
    })
}
trending()

async function circle() {
    let artist = await fetch("Artist.json")
    let data = await artist.json()
    let circle = document.querySelector(".circle")
    data.forEach(rendering1 => {
        circle.innerHTML += `<div class="circle-card">
    <img src="${rendering1.image}" alt="">
    <div class="green"><img src="images/green.svg"></div>
    <div class="flex2">
    <p class="">Artist</p>
    </div>
   </div>
`
    })
}
circle()


async function popular() {
    let popularsongs = await fetch("Popular.json")
    let data = await popularsongs.json()
    let popularcards = document.querySelector(".popularcards")
    data.forEach(rendering2 => {
        popularcards.innerHTML += `<div class="popular-card">
    <img src="${rendering2.image}"alt="">
    <div class="green"><img src="images/green.svg"></div>
    <div class="flex2">
    <h2 class="text2">${rendering2.song}</h2>
    <p class="text2">${rendering2.artist}</p>
    </div>
    </div>
`
    })
}
popular()

async function radio() {
    let radiostations = await fetch("PopularRadio.json")
    let data = await radiostations.json()
    let radiocards = document.querySelector(".radiocards")
    data.forEach(rendering3 => {
        radiocards.innerHTML += `<div class="radio-card">
    <img src="${rendering3.image}" alt="">
    <div class="green"><img src="images/green.svg"></div>
    <div class="flex2">
    <p class="">${rendering3.collaborators}</p>
    </div>
    </div>
`
    })
}
radio()

async function charts() {
    let charts = await fetch("FeaturedCards.json")
    let data = await charts.json()
    let chartscards = document.querySelector(".chartscards")
    data.forEach(rendering4 => {
        chartscards.innerHTML += `<div class="charts-card">
    <img src="${rendering4.image}" alt="">
    <div class="green"><img src="images/green.svg"></div>
    <div class="flex2">
    <p class="">${rendering4.description}</p>
    </div>
    </div>
`
    })
}
charts()

async function imp() {
    let imp = await fetch("indian_music_playlists.json")
    let data = await imp.json()
    let impcards = document.querySelector(".impcards")
    data.forEach(rendering5 => {
        impcards.innerHTML += `<div class="imp-card">
    <img src="${rendering5.image}" alt="">
    <div class="green"><img src="images/green.svg"></div>
    <div class="flex2">
    <p class="">${rendering5.description}</p>
    </div>
    </div>
`
    })
}
imp()


const scrollContainer = document.getElementById("cardScroll");

document.querySelector(".leftarrow").onclick = () => {
    scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
};

document.querySelector(".rightarrow").onclick = () => {
    scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
};
