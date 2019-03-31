import net from 'net'

const createUI = (sender, reciever, voiceSender, voiceReciever, connectTo) => {
  console.log('Connecting...')

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

  let connection = sender.connect(`${connectTo}_reciever_video`)
  connection.on('open', () => {
    console.log('On connection open! Starting server')
    const server = net.createServer((socket) => {
      socket.write('Echo server\r\n')
      socket.on('Sokcet received data', (data) => {
        connection && connection.send(data)
      })
    })
    server.listen(1337, '127.0.0.1')
  })

  document.getElementById('IMP').style.display = 'block'
  document.getElementById('IMP').addEventListener('click', () => {
    console.log('Reseting connection')
    connection = sender.connect(`${connectTo}_reciever`)
    connection.on('open', () => {
      connection.send('posielam data')
      const server = net.createServer((socket) => {
        socket.write('Echo server\r\n')
        socket.on('data', (data) => {
          console.log('Sokcet received data', data)
          connection.send(data)
        })
      })

      server.listen(1337, '127.0.0.1')
    })
  })
}

export default createUI
