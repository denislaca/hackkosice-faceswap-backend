import createUI from './ui'
import Peer from 'peerjs'

let connectTo, sender, reciever, voiceSender, voiceReciever
const makeConnection = () => {
  console.log('Making connection')
  connectTo = document.getElementById('calleeID').value

  reciever.on('connection', (conn) => {
    console.log('On image receiver connection')
    conn.on('data', (data) => {
      console.log('Received data', data)
      const image = document.getElementById('image')
      const hehe = new Uint8Array(data)
      const blob = new Blob([hehe], {type: 'image/jpeg'})
      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(blob)
      image.src = imageUrl
      image.onerror = (err) => console.log('Error', err)
    })
  })
  voiceReciever.on('call', (callReciever) => {
    console.log('On voice receiver call')
    navigator.getUserMedia(
      {video: false, audio: true},
      (stream) => {
        callReciever.answer(stream) // Answer the call with an A/V stream.
        callReciever.on('stream', (remoteStream) => {
          const audio = document.querySelector('audio')

          audio.src = window.URL.createObjectURL(remoteStream)
          audio.onloadedmetadata = function(e) {
            console.log('Now playing the audio')
            audio.play()
          }
        })
      },
      (err) => {
        console.log('Failed to get local stream', err)
      }
    )
  })

  createUI(sender, reciever, voiceSender, voiceReciever, connectTo)
  document.getElementById('formWrapper').style.opacity = 0
  setTimeout(() => {
    document.getElementById('image').style.display = 'block'
  }, 500)
}

const setupConnection = () => {
  console.log('Setting up new connection')
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
}

const fn = () => {
  document.getElementById('connect').removeEventListener('click', fn)

  setupConnection()

  document.getElementById('callersIDContainer').style.left = '-100%'
  document.getElementById('connect').innerHTML = '<i class="material-icons left">share</i> Connect'
  document.getElementById('connect').addEventListener('click', makeConnection)
}

document.getElementById('connect').addEventListener('click', fn)

document.getElementById('IMP').addEventListener('click', () => {
  console.log('Reseting connection')
  setupConnection()
})

document.getElementById('IMP2').addEventListener('click', () => {
  console.log('Send test message')
  sender.send('sprava')
})
