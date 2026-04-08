const songs = [
    { title: "Consume", artist: "Chase Atlantic" },
    { title: "Perfect", artist: "Ed Sheeran"},
    { title: "Unconditionally", artist: "Katy Perry"}
]

let currentSong = 0

function selectSong(index) {
    progressVal = 0
    currentSong = index
    
    document.querySelector('.now-title').textContent = songs[index].title
    document.querySelector('.now-artist').textContent = songs[index].artist

    // highlight active song
    const allSongs = document.querySelectorAll('.song-item')
    allSongs.forEach((item, i) => {
        if (i === index) {
            item.style.background = '#1a1a2e'
        } else {
            item.style.background = 'none'
        }
    })
}

let isPlaying = false

function togglePlay() {
    isPlaying = !isPlaying

    const playBtn = document.querySelector('.play-btn')

    if (isPlaying) {
        playBtn.textContent = '⏸'
    } else {
        playBtn.textContent = '▶'
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length
    selectSong(currentSong)
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length
    selectSong(currentSong)
}

let progressInterval = null
let progressVal = 0

function startProgress() {
    clearInterval(progressInterval)
    progressInterval = setInterval(() => {
        if (isPlaying) {
            progressVal += 0.1
            if (progressVal >= 100) {
                progressVal = 0
                nextSong()
            }
            document.querySelector('.progress-fill').style.width = progressVal + '%'
        }
    }, 100)
}

startProgress()

console.log(songs)