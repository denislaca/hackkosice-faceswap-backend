import net from 'net'

const createControllers = (sender, reciever, voiceSender, voiceReciever, connectTo) => {
  const image = document.getElementById('image')

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


  voiceReciever.on('call', (callReciever) => {
    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      callReciever.answer(stream) // Answer the call with an A/V stream.
      callReciever.on('stream', (remoteStream) => {
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


  let connection
  const send = document.querySelector('#send')
  send.addEventListener('click', () => {
    connection && connection.send('afoj')
    connection && connection.send('prefix')
  })
  const connect = document.querySelector('#connect')
  const server = net.createServer((socket) => {

    socket.write('Echo server\r\n')
    socket.on('data', (data) => {
      connection && connection.send(data)
    })
  })
  server.listen(1337, '127.0.0.1')

  connect.addEventListener('click', () => {
    console.log('Connecting...')
    connection = sender.connect(`${connectTo}_reciever_video`)
    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      const call = voiceSender.call(`${connectTo}_reciever_voice`, stream)
      call.on('stream', (remoteStream) => {
      })
    }, (err) => {
      console.log('Failed to get local stream', err)
    })
    connection.on('open', () => {
      connection && connection.send('posielam data')
    })
  })
}

export default createControllers

