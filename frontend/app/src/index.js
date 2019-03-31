import createUI from './ui'
import Stats from 'stats.js'
import Peer from 'peerjs'
import envProperties from 'dotenv'

// apply properties from .env file
envProperties.config()

// in development show FPS counter
if (process.env.NODE_ENV === 'development') {
  const stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom)

  window.requestAnimationFrame(function loop() {
    stats.update()
    window.requestAnimationFrame(loop)
  })
}

let sender = new Peer(`${process.env.MY_CONNECTION}_sender_video`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})
let reciever = new Peer(`${process.env.MY_CONNECTION}_reciever_video`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})

let voiceSender = new Peer(`${process.env.MY_CONNECTION}_sender_voice`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})

let voiceReciever = new Peer(`${process.env.MY_CONNECTION}_reciever_voice`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})


navigator.getUserMedia({video: false, audio: true}, (stream) => {
  const call = voiceSender.call(`${process.env.CONNECT_TO}_reciever_voice`, stream)
  call.on('stream', (remoteStream) => {
  })
}, (err) => {
  console.log('Failed to get local stream', err)
})

voiceReciever.on('call', (call) => {
  navigator.getUserMedia({video: false, audio: true}, (stream) => {
    call.answer(stream) // Answer the call with an A/V stream.
    call.on('stream', (remoteStream) => {
      const audio = document.querySelector('audio')
      audio.src = window.URL.createObjectURL(remoteStream)
      audio.onloadedmetadata = function(e) {
        console.log('now playing the audio')
        audio.play()
      }

    })
  }, (err) => {
    console.log('Failed to get local stream', err)
  })
})


try {
  sender.on('error', (err) => console.log(err))
  reciever.on('error', (err) => console.log(err))
  voiceSender.on('error', (err) => console.log(err))
  voiceReciever.on('error', (err) => console.log(err))


  createUI(sender, reciever, voiceSender, voiceReciever)
} catch (err) {
  // eslint-disable-next-line
  console.error('Connection failed', err)
  document.getElementById('loading').classList.toggle('visible')
  document.getElementById('error').classList.toggle('visible')
  const elem = document.getElementById('error')
  elem.innerHTML = 'Connection failed, please try later!'
}

const prefixMaRukyNaopak = () => {
  connectTo = document.getElementById('calleeID').value
  console.log(sender, reciever, voiceSender, voiceReciever)
  createUI(sender, reciever, voiceSender, voiceReciever, connectTo)
  document.getElementById('formWrapper').style.opacity = 0
  setTimeout(() => {
    document.getElementById('image').style.display = 'block'
  }, 500)
}


const defaultListener = () => {
  document.getElementById('connect').removeEventListener('click', defaultListener)
  const myConnection = document.getElementById('callerID').value
  sender = new Peer(`${myConnection}_sender_video`, {
    host: '10.236.255.137',
    port: 8080,
    path: '/api',
  })
  reciever = new Peer(`${myConnection}_reciever_video`, {
    host: '10.236.255.137',
    port: 8080,
    path: '/api',
  })

  voiceSender = new Peer(`${myConnection}_sender_voice`, {
    host: '10.236.255.137',
    port: 8080,
    path: '/api',
  })

  voiceReciever = new Peer(`${myConnection}_reciever_voice`, {
    host: '10.236.255.137',
    port: 8080,
    path: '/api',
  })

  sender && sender.on('error', (err) => console.log(err))
  reciever && reciever.on('error', (err) => console.log(err))
  voiceSender && voiceSender.on('error', (err) => console.log(err))
  voiceReciever && voiceReciever.on('error', (err) => console.log(err))

  document.getElementById('callersIDContainer').style.left = '-100%'
  document.getElementById('connect').innerHTML = '<i class="material-icons left">share</i> Connect'
  document.getElementById('connect').addEventListener('click', prefixMaRukyNaopak)
}

document.getElementById('connect').addEventListener('click', defaultListener)
