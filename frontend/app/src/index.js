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

const sender = new Peer(`${process.env.MY_CONNECTION}_sender_video`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})
const reciever = new Peer(`${process.env.MY_CONNECTION}_reciever_video`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})

const voiceSender = new Peer(`${process.env.MY_CONNECTION}_sender_voice`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})

const voiceReciever = new Peer(`${process.env.MY_CONNECTION}_reciever_voice`, {
  host: '10.236.255.137',
  port: 8080,
  path: '/api',
})


navigator.getUserMedia({video: false, audio: true}, function(stream) {
  var call = voiceSender.call(`${process.env.MY_CONNECTION}_reciever_voice`, stream);
  call.on('stream', function(remoteStream) {
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});

voiceReciever.on('call', function(call) {
  navigator.getUserMedia({video: false, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      var audio = document.querySelector('audio');
      audio.src = window.URL.createObjectURL(remoteStream);
      audio.onloadedmetadata = function(e){
      console.log('now playing the audio');
      audio.play();
    }

    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});


try {
  sender.on('error', (err) => console.log(err))
  reciever.on('error', (err) => console.log(err))
  voiceSender.on('error', (err) => console.log(err))
  voiceReciever.on('error', (err) => console.log(err))


  createUI(sender, reciever)
} catch (err) {
  // eslint-disable-next-line
  console.error('Connection failed', err)
  document.getElementById('loading').classList.toggle('visible')
  document.getElementById('error').classList.toggle('visible')
  const elem = document.getElementById('error')
  elem.innerHTML = 'Connection failed, please try later!'
}
