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
