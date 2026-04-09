
const songs = [
    { title: "Consume", artist: "Chase Atlantic", src: "song1.mp3", cover: "cover1.jpg", video: "background1.mp4", audiostart: 174},
    { title: "Perfect", artist: "Ed Sheeran", src: "song2.mp3", cover: "cover2.jpg", video: "background2.mp4", audiostart: 0},
    { title: "Unconditionally", artist: "Katy Perry", src: "song3.mp3", cover: "cover3.jpg", video: "background3.mp4", audiostart: 0},
]

const audio = new Audio(songs[0].src)


let currentSong = 0

function previewSong(index) {
    const bgVideo = document.getElementById('bg-video')
    bgVideo.src = songs[index].video
    bgVideo.play()
}


function selectSong(index) {

    currentSong = index
    
    audio.src = songs[index].src
    isPlaying = true

    document.querySelector('.back-btn').style.display = 'block'
    document.querySelector('.now-playing').style.display = 'block'
    document.querySelector('.song-list').style.display = 'none'
    document.querySelector('.playlist-title').style.display = 'none'
    document.querySelector('.now-title').textContent = songs[index].title
    document.querySelector('.now-artist').textContent = songs[index].artist
    document.querySelector('.play-btn').textContent = '⏸'
    document.querySelector('#cover-art').src  =songs[index].cover

    // highlight active song
    const allSongs = document.querySelectorAll('.song-item')
    allSongs.forEach((item, i) => {
         item.classList.remove('active')
     })
     allSongs[index].classList.add('active')

    const bgVideo = document.getElementById('bg-video')
    bgVideo.src = songs[index].video
    bgVideo.play()

}

function goBack() {
    document.querySelector('.back-btn').style.display = 'none'
    document.querySelector('.now-playing').style.display = 'none'
    document.querySelector('.song-list').style.display = 'block'
    document.querySelector('.playlist-title').style.display = 'block'
    audio.pause()
    isPlaying = false
}

function stopPreview() {
    if (!isPlaying) {
        const bgVideo = document.getElementById('bg-video')
        bgVideo.pause()
        bgVideo.src = ""
    }
}

let isPlaying = false

function togglePlay() {
    const bgVideo = document.getElementById('bg-video')
    isPlaying = !isPlaying
    const playBtn = document.querySelector('.play-btn')


    if (isPlaying) {
        playBtn.textContent = '⏸'
        audio.play()
        bgVideo.play()
    } else {
        playBtn.textContent = '▶'
        audio.pause()
        bgVideo.pause()
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length
    selectSong(currentSong)
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length)  % songs.length
    selectSong(currentSong)
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return mins + ':' + (secs < 10 ? '0' : '') + secs
}

audio.addEventListener('timeupdate', () => {
    const percentage = (audio.currentTime / audio.duration) * 100
    document.querySelector('.progress-fill').style.width = percentage + '%'
    document.querySelector('#current-time').textContent = formatTime(audio.currentTime)
})

audio.addEventListener('loadedmetadata', () => {
    document.querySelector('#total-time').textContent = formatTime(audio.duration)
    audio.currentTime = songs[currentSong].audiostart
    if (isPlaying) {
        audio.play()
    }
})

const bar = document.querySelector('.progress-bar')

bar.addEventListener('mousedown', (e) => {
    seek(e)
    bar.addEventListener('mousemove', seek)
})

document.addEventListener('mouseup', () => {
    bar.removeEventListener('mousemove', seek)
})

function seek(e) {
    const rect = bar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = (clickX / rect.width) * 100
    const progressVal = Math.min(Math.max(percentage, 0), 100)
    document.querySelector('.progress-fill').style.width = progressVal + '%'
    audio.currentTime = (progressVal / 100) * audio.duration

}

console.log(songs)
