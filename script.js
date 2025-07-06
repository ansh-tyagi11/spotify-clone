console.log('Let write javascript')


async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("td")
    console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endWith(".m4a")) {
            songs.push(element.href)
        }
    }
    return songs
}
getSongs()

async function main() {
    // Get the list of all songs
    let songs = await getSongs()
    console.log(songs)

    // Play the first song
    var audio = new Audio(songs[0])
    audio.play()

    audio.addEventListener("loadedata", () => {
        let duration = audio.duration
        console.log(duration)
    })
}
main()