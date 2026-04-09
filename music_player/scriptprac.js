
const songs = [
    { title: "Consume", artist: "Chase Atlantic", src: "song1.mp3", cover: "cover1.jpg",
     video: "background1.mp4", audiostart: 174,
     lyrics: [
        { time: 174, line: "Backstabbing bitches tryna kill me with the whole knife"},
        { time: 177, line: "Day I die'll be the only day a nigga ghostwrite"},
        { time: 180.5, line: "When I go, they′ll treat me like a god if this shit goes right"},
        { time: 184, line: `She said, "Careful, or you'll lose it"` },
        { time: 188, line: "But, girl, I′m only human" },
        { time: 191, line: "And I know there's a blade where your heart is"},
        { time: 194.5, line: "And you know how to use it"},
        { time: 197.5, line: "And you can take my flesh if you want, girl"},
        { time: 201, line: "But, baby, don′t abuse it (calm down)"},
        { time: 205, line: `These voices in my head screaming, "Run, now"`},
        { time: 208, line: "I'm praying that they're human"},
        { time: 211, line: "Please understand that I′m trying my hardest"},
        { time: 214, line: "My head′s a mess, but I'm trying regardless" },
        { time: 217, line: "Anxiety is one hell of a problem" },
        { time: 220, line: "She′s latching onto me, I can't resolve it" },
        { time: 224, line: "It′s not right, it's not fair, it′s not fair, it's not fair" },
        { time: 232, line: "It's no fair, it′s no fair" },
        { time: 235, line: "Oh, no, no, no (ooh-ooh)" },
        { time: 245, line: "Don′t run, don't run" },
     ]
    
    },
    { title: "Perfect", artist: "Ed Sheeran", src: "song2.mp3", cover: "cover2.jpg",
     video: "background2.mp4", audiostart: 194,
    lyrics: [
        { time: 194, line: "~ ~ ~" },
        { time: 200, line: "No, no, no" },
        { time: 203.5, line: "Mm, oh" },
        { time: 207, line: "Baby, I'm dancin' in the dark with you between my arms"},
        { time: 218, line: "Barefoot on the grass, listening to our favorite song"},
        { time: 225, line: "I have faith in what I see, now I know I have met"},
        { time: 231, line: "An angel in person, and she looks perfect"},
        { time: 238, line: "I don't deserve this, you look perfect tonight" },
    ]},
    { title: "Unconditionally", artist: "Katy Perry", src: "song3.mp3", cover: "cover3.jpg",
     video: "background3.mp4", audiostart: 146,
     lyrics: [
        { time: 146, line: "Acceptance is the key to be"},
        { time: 151, line: "To be truly free"},
        { time: 153.5, line: "Will you do the same for me?"},
        { time: 162, line: "Unconditional, unconditionally"},
        { time: 170, line: "I will love you unconditionally"},
        { time: 177, line: "There is no fear now"},
        { time: 181, line: "Let go and just be free"},
        { time: 185, line: "Cause I will love you unconditionally"},
        { time: 191, line: "oh, yeah"},
        { time: 200, line: "I will love you (unconditionally)" },
        { time: 207, line: "I will love you"},
        { time: 215, line: "I will love you unconditionally" },
     ]},
]

const audio = new Audio(songs[0].src)


let currentSong = 0

function previewSong(index) {
    const bgVideo = document.getElementById('bg-video')
    bgVideo.src = songs[index].video
    bgVideo.play()
}

function loadLyrics() {
    const song = songs[currentSong]
    const container = document.getElementById('lyrics-container')
    container.innerHTML = ""

    if (!song.lyrics) return

    song.lyrics.forEach((lyric, i) => {
        const p = document.createElement('p')
        p.textContent = lyric.line
        p.classList.add('lyric-line')
        p.id = 'lyric-' + i
        container.appendChild(p)
    })
}

function updateLyrics() {
    const song = songs[currentSong]
    if (!song.lyrics) return

    const currentTime = audio.currentTime
    let activeIndex = -1

    for (let i = 0; i < song.lyrics.length; i++) {
        if (currentTime >= song.lyrics[i].time) {
            activeIndex = i
        }
    }

    document.querySelectorAll('.lyric-line').forEach(line => {
        line.classList.remove('active')
    })

    if (activeIndex !== -1) {
        const activeLine = document.getElementById('lyric-' + activeIndex)
        activeLine.classList.add('active')
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
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
    loadLyrics()

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
    updateLyrics()
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
