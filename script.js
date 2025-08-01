console.log('Let write javascript')

let audio;
let songs;

async function getSongs() {
    let a = await fetch("./songs/")
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

async function main() {
    // Get the list of all songs
    let songs = await getSongs()
    // console.log(songs)
    // to play the first song
    audio = new Audio(songs[0]);
    // audio = new Audio();
}

async function play() {
    // It will helps to play the song on click it we are not using this due to single thread structure of javascript only one function will run at one time either it is main() or play() in this case only play function will run

    if (audio) {
        audio.pause() // Initialize if not already done
    }

    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();

    if (src === "play.svg") {
        pause.src = "images/loading.svg"; // temporary loading state

        try {
            await audio.play(); // Wait until it actually starts playing
            pause.src = "images/pause.svg"; // Only switch when playing
            console.log(audio)
        } catch (err) {
            // console.error("Playback error:",err);
            console.log("error agaaya bhai")
            pause.src = "images/play.svg"; // Reset to play icon if failed
        }
    } else if (src === "pause.svg") {
        audio.pause();
        pause.src = "images/play.svg";
    } else {
        pause.src = "images/play.svg";
    }
    console.log("play run hua hai")
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



let currentSongIndex = 0;
audio = new Audio()
// audio.src = songs[currentSongIndex]
// audio.play()
const nextSong = document.getElementById("nextSong");
const previousSong = document.getElementById("previousSong")
let songname = document.getElementById("songname")


nextSong.addEventListener("click", () => {

    currentSongIndex = (currentSongIndex + 1) % songs.length;
    console.log(currentSongIndex);

    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();
    if (src === "play.svg") {
        pause.src = "images/pause.svg";
        // console.log(audio)
        // return playSong(songs[currentSongIndex]);
    }
    // else if (src === "pause.svg") {
    //     audio.pause();
    //     pause.src = "images/play.svg";
    // }
    else {
        pause.src = "images/pause.svg";
    }

    let getsongname = songs[currentSongIndex].split("/").pop()
    // .m4a ko nikal do empty string dal do
    songname.innerHTML = `<span>${getsongname.replace(".m4a", "").replaceAll("%20", " ")}</span>`

    playSong(songs[currentSongIndex]);
});

previousSong.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    console.log(currentSongIndex);

    let pause = document.querySelector(".play");
    let src = pause.src.split("/").pop();
    if (src === "play.svg") {
        pause.src = "images/pause.svg";
        // console.log(audio)
    }
    else {
        pause.src = "images/pause.svg";
    }

    let songame = songs[currentSongIndex].split("/").pop()
    songname.innerHTML = `<span>${songame.replace(".m4a", "").replaceAll("%20", " ")}</span>`

    playSong(songs[currentSongIndex]);
})

function playSong(song) {
    audio.src = song;
    console.log(audio.src)
    audio.play();
}

function showAll(sectionClass) {
    // Show the card inside the current section
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

    // Hide the "Show All" button in the current section
    const showAllBtn = document.querySelector(`.${sectionClass} .showall`);
    if (showAllBtn) showAllBtn.style.display = "none";

    // const arrow = document.querySelectorAll(".arrow")
    // arrow.style.display = "none"

    // Hide all other sections
    const allSections = ['trending', 'popularsongs', 'popularartist', 'popularradio', 'featured', 'Indian_Music_Playlist'];

    // !== is a comparison operator: “is not equal"
    // ! is a logical operator: “not”
    // | Loop Step | `sec` Value               | Check (`sec !== sectionClass`)            | Result            |
    // | --------- | ------------------------- | ----------------------------------------- | ----------------- |
    // | 1         | `'trending'`              | `'trending' !== 'popularartist'` → ✅ true | Hide `'trending'` |
    // | 2         | `'popularsongs'`          | ✅ true                                    | Hide it           |
    // | 3         | `'popularartist'`         | ❌ false                                   | Do nothing        |
    // | 4         | `'popularradio'`          | ✅ true                                    | Hide it           |
    // | 5         | `'featured'`              | ✅ true                                    | Hide it           |
    // | 6         | `'Indian_Music_Playlist'` | ✅ true                                    | Hide it           |

    allSections.forEach(sec => {
        if (sec !== sectionClass) {
            const section = document.querySelector(`.${sec}`);
            if (section) section.style.display = "none";
        }
    });
}

// ---------------------------------------------------DYNAMICALLY ADDING CONTENT---------------------------------------------------

async function trending() {
    let trendingsongs = await fetch("./TrendingSongs.json")
    let data = await trendingsongs.json()
    let card = document.querySelector(".card")
    data.forEach(rendering => {
        card.innerHTML += `<div class="song-card">
    <img src="${rendering.image}"  alt="">
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
    let artist = await fetch("./Artist.json")
    let data = await artist.json()
    let circle = document.querySelector(".circle")
    data.forEach(rendering1 => {
        circle.innerHTML += `<div class="circle-card">
    <img src="${rendering1.image}" alt="Artist">
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
    let popularsongs = await fetch("./Popular.json")
    let data = await popularsongs.json()
    let popularcards = document.querySelector(".popularcards")
    data.forEach(rendering2 => {
        popularcards.innerHTML += `<div class="popular-card">
    <img src="${rendering2.image}" alt="">
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
    let radiostations = await fetch("./PopularRadio.json")
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
    let charts = await fetch("./FeaturedCards.json")
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
    let imp = await fetch("./indian_music_playlists.json")
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

// Wait until the entire HTML document (DOM) has been fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Select all elements on the page with the class 'trending-scroll-wrapper'
    // (Each wrapper is one scrollable section with its own arrows and cards)
    const wrappers = document.querySelectorAll('.trending-scroll-wrapper');

    // Loop through each scrollable section
    wrappers.forEach(wrapper => {

        // Inside each wrapper, select the left and right arrow elements
        const leftArrow = wrapper.querySelector('.leftarrow');
        const rightArrow = wrapper.querySelector('.rightarrow');

        // Also select the container that holds the horizontal scrollable cards
        const scrollContainer = wrapper.querySelector('.card-container');

        // How far to scroll (in pixels) when the arrow is clicked
        const scrollAmount = 300;

        // If there is no scrollable container, skip this wrapper
        if (!scrollContainer) return;

        // When the left arrow is clicked, scroll the container to the left
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -scrollAmount,      // Move 300px to the left
                behavior: 'smooth'        // Animate the scroll smoothly
            });
        });

        // When the right arrow is clicked, scroll the container to the right
        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: scrollAmount,       // Move 300px to the right
                behavior: 'smooth'        // Animate the scroll smoothly
            });
        });
    });
});

// let left = document.getElementsByClassName("left")[0]
// let hamburger = document.getElementById("hamburger")
// let x = 10
// let y = 10
// if (x == y) {
//     hamburger.style.display = "none"
//     left.innerHTML = `<div class="library flex">
//                     Your Library
//                     <div class="add"><img class="invert" src="images/add.svg" width="24px" height="24px" alt="Add">
//                     </div>
//                 </div>
//                 <div class="box1 border">
//                     <h3>Create your first Playlist</h3>
//                     <p>It's easy,we'll help you</p>
//                     <button class="create-playlist-btn">Create playlist</button>
//                 </div>
//                 <div class="box1 border" style="margin-top: 10px;">
//                     <h3>Let's find the some podcasts to follow</h3>
//                     <p>We will keep updated on new episodes</p>
//                     <button class="create-playlist-btn">Browse podcasts</button>
//                 </div>
//                 <div class="links">
//                     <a target="_blank" href="https://open.spotify.com">Legal</a>
//                     <a target="_blank" href="https://open.spotify.com">Safety & Privacy Centre</a>
//                     <a target="_blank" href="https://open.spotify.com">Privacy Policy</a>
//                     <a target="_blank" href="https://open.spotify.com">Cookies</a>
//                     <a target="_blank" href="https://open.spotify.com">Accessibility</a>
//                     <a target="_blank" href="https://open.spotify.com">About Ads</a>
//                 </div>
//                 <div class="hover"><a target="_blank" href="https://open.spotify.com"
//                         style="color: white; text-decoration: none; margin: 0px 8px;font-size: 12px;">Cookies</a></div>
//                 <button class="language flex align-items"><img class="invert" src="images/language.svg" width="16"
//                         height="16" alt="language">English</button>`}
// else {
//     left.style.display = "none"
// }

let time = document.getElementById("time");
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
}
