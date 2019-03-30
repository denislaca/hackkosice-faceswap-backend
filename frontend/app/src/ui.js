import {desktopCapturer} from 'electron'

const createUI = async (rootElement) => {
  console.log('hello')
  const sources = desktopCapturer.getSources({types: ['window', 'screen']})
  navigator.getUserMedia(
    {video: true, audio: true},
    (localMediaStream) => {
      const video = document.querySelector('video')
      video.src = window.URL.createObjectURL(localMediaStream)
      video.onloadedmetadata = (e) => {
        // Ready to go. Do some stuff.
      }
    },
    (e) => {
      console.log('Error', e)
    }
  )

  function handleStream(stream) {
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
  }

  function handleError(e) {
    console.log(e)
  }
}

export default createUI
