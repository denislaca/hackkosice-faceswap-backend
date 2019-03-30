import videoJs from 'video.js'

const createUI = (peer) => {
  navigator.getUserMedia(
    {video: true, audio: true},
    (localMediaStream) => {
      const video = document.querySelector('video')
      video.src = window.URL.createObjectURL(localMediaStream)
      video.onloadedmetadata = (e) => {
        const player = videoJs('my-player')
        player.play()
      }
    },
    (e) => {
      console.error('Error getting user media', e)
    }
  )

  const elem = document.querySelector('#send')
  elem.addEventListener('click', () => {
    const message = 'hi!'
    peer.on('open', () => {
      peer.send(message)
    })

  })
}

export default createUI
