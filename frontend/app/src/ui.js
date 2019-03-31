import videoJs from 'video.js'
import net from 'net'
import {initAudio} from './sound'

const createCamera = () => {
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
}

const joinBuffers = (buffer1, buffer2) => {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}

const createUI = (sender, reciever, voiceSender, voiceReciever, connectTo) => {
  // createCamera()
  console.log('Connecting...')
  const connection = sender.connect(`${connectTo}_reciever_video`)
  navigator.getUserMedia(
    {video: false, audio: true},
    (stream) => {
      const call = voiceSender.call(`${connectTo}_reciever_voice`, stream)
      call.on('stream', (remoteStream) => {
        console.log('sending audio')
      })
    },
    (err) => {
      console.log('Failed to get local stream', err)
    }
  )

  voiceReciever.on('call', (callReciever) => {
    navigator.getUserMedia(
      {video: false, audio: true},
      (stream) => {
        callReciever.answer(stream) // Answer the call with an A/V stream.
        callReciever.on('stream', (remoteStream) => {
          const audio = document.querySelector('audio')
          // initAudio(remoteStream)

          audio.src = window.URL.createObjectURL(remoteStream)
          audio.onloadedmetadata = function(e) {
            console.log('now playing the audio')
            audio.play()
          }
        })
      },
      (err) => {
        console.log('Failed to get local stream', err)
      }
    )
  })
  connection.on('open', () => {
    connection && connection.send('posielam data')
    // connection && connection.send('afoj')
    // connection && connection.send('prefix')
  })

  reciever.on('connection', (conn) => {
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

  const server = net.createServer((socket) => {
    socket.write('Echo server\r\n')
    socket.on('data', (data) => {
      connection && connection.send(data)
    })
  })
  server.listen(1337, '127.0.0.1')
}

export default createUI
