import createUI from './ui'
import createControllers from './controllers'
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

// const sender = new Peer(`${process.env.MY_CONNECTION}_sender_video`, {
//   host: '10.236.255.137',
//   port: 8080,
//   path: '/api',
// })
// const reciever = new Peer(`${process.env.MY_CONNECTION}_reciever_video`, {
//   host: '10.236.255.137',
//   port: 8080,
//   path: '/api',
// })

// const voiceSender = new Peer(`${process.env.MY_CONNECTION}_sender_voice`, {
//   host: '10.236.255.137',
//   port: 8080,
//   path: '/api',
// })

// const voiceReciever = new Peer(`${process.env.MY_CONNECTION}_reciever_voice`, {
//   host: '10.236.255.137',
//   port: 8080,
//   path: '/api',
// })
let connectTo, sender, reciever, voiceSender, voiceReciever
const kraloveSrackyKtoreSiPoSebeNeupratal = () => {
  connectTo = document.getElementById('calleeID').value
  createControllers(sender, reciever, voiceSender, voiceReciever, connectTo)
  document.getElementById('formWrapper').style.opacity = 0
}


const defaultListener = () => {
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
  document.getElementById('connect').addEventListener('click', kraloveSrackyKtoreSiPoSebeNeupratal)
  document.getElementById('connect').removeEventListener('click', defaultListener)
}

document.getElementById('connect').addEventListener('click', defaultListener)

try {
  createUI()
} catch (err) {
  // eslint-disable-next-line
  console.error('Connection failed', err)
  document.getElementById('loading').classList.toggle('visible')
  document.getElementById('error').classList.toggle('visible')
  const elem = document.getElementById('error')
  elem.innerHTML = 'Connection failed, please try later!'
}
