console.log('Let write javascript')


async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
getSongs()

async function main() {
    // Get the list of all songs
    let songs = await getSongs()
    console.log(songs)
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for await (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
        <img style="filter: invert(1);" src="images/music.svg" alt="">
        ${song}
                    <div class="info">
                        <div>Song name</div>
                        <div>AAKASH</div>
                    </div>
                    <div class="playnow">
                        <span>PlayNow</span>
                        <img style="filter: invert(1);" src="images/play.svg" width="24"  alt="">
                    </div>
                    
        </li>`
        // songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20","")}</li>`
    }

    // Play the first song
    // Create a play button to comply with browser autoplay policies
    // const playButton = document.createElement("button");
    // playButton.textContent = "Play First Song";
    // document.body.appendChild(playButton);

    var audio = new Audio(songs[0]);
    // audio.play();


    audio.addEventListener("loadedata", () => {
        let duration = audio.duration
        console.log(audio.duration, audio.currentSrc, audio.c)
    })
}
main()