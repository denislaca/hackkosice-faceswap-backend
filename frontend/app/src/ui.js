import videoJs from 'video.js'
import net from 'net'
const createUI = (sender, reciever) => {
  // navigator.getUserMedia(
  //   {video: true, audio: true},
  //   (localMediaStream) => {
  //     const video = document.querySelector('video')
  //     video.src = window.URL.createObjectURL(localMediaStream)
  //     video.onloadedmetadata = (e) => {
  //       const player = videoJs('my-player')
  //       player.play()
  //     }
  //   },
  //   (e) => {
  //     console.error('Error getting user media', e)
  //   }
  // )

  reciever.on('connection', (conn) => {
    conn.on('data', (data) => {
      console.log(data)
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
    connection = sender.connect(`${process.env.CONNECT_TO}_reciever`)
    connection.on('open', () => {
      connection && connection.send('posielam data')
    })

  })
}

export default createUI
