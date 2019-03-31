import createUI from './ui'
import Peer from 'peerjs'

let connectTo, sender, reciever, voiceSender, voiceReciever
const makeConnection = () => {
  console.log('Making connection')
  connectTo = document.getElementById('calleeID').value

  createUI(sender, reciever, voiceSender, voiceReciever, connectTo)
  document.getElementById('formWrapper').style.opacity = 0
  setTimeout(() => {
    document.getElementById('image').style.display = 'block'
  }, 500)
}

const setupConnection = () => {
  console.log('Setting up connection')
  document.getElementById('connect').removeEventListener('click', setupConnection)

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
  document.getElementById('connect').addEventListener('click', makeConnection)
}

document.getElementById('connect').addEventListener('click', setupConnection)
