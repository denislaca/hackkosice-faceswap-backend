import net from 'net'

const createUI = (sender, reciever, voiceSender, voiceReciever, connectTo) => {
  console.log('Connecting...')

  // these may be removed later, but let's check conenction from other clients too
  sender.on('connection', () => {
    console.log('On image sender connection')
  })
  voiceSender.on('connection', () => {
    console.log('On voice sender connection')
  })

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

  // Toto tu pravdepodobne musi byt
  navigator.getUserMedia(
    {video: false, audio: true},
    (stream) => {
      const call = voiceSender.call(`${connectTo}_reciever_voice`, stream)
      call.on('stream', (remoteStream) => {})
    },
    (err) => {
      console.log('Failed to get local stream', err)
    }
  )

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

  const connection = sender.connect(`${connectTo}_reciever_video`)
  connection.on('open', () => {
    console.log('On connection open! Starting server')
    const server = net.createServer((socket) => {
      socket.write('Echo server\r\n')
      socket.on('data', (data) => {
        connection && connection.send(data)
      })
    })
    server.listen(1337, '127.0.0.1')
  })
}

export default createUI
