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
  let connection
  const send = document.querySelector('#send')
  send.addEventListener('click', () => {
    console.log('Sending message')
    connection.send(`hi!${process.env.CONNECT_TO}`)
  })
  const connect = document.querySelector('#connect')
  connect.addEventListener('click', () => {
    console.log('connecting')
    connection = peer.connect(process.env.CONNECT_TO)
  })
}

export default createUI
