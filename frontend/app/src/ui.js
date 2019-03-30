import videoJs from 'video.js'

const createUI = (connection) => {
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
    console.log('Sending message')
    connection.send(`hi!${process.env.CONNECT_TO}`)
  })
}

export default createUI
