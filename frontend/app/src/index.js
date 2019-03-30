import createUI from './ui'
import Stats from 'stats.js'
import Peer from 'peerjs'
import envProperties from 'dotenv'
import uuid from 'uuid/v4'

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

const peer = new Peer(process.env.MY_CONNECTION, {host: '10.236.255.137', port: 8080, path: '/api'})

try {
  const connection = peer.connect(process.env.CONNECT_TO)
  const connection1 = peer.connect('emo')

  createUI(connection)
  connection.on('open', () => {
    connection.send('Afoj')
    connection.send('Prefix')
  })
  connection1.on('open', () => {
    connection1.send('Emo')
  })
  peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      console.log(data)
    })
  })

  document.getElementById('loading').classList.toggle('visible')
} catch (err) {
  // eslint-disable-next-line
  console.error('Connection failed', err)
  document.getElementById('loading').classList.toggle('visible')
  document.getElementById('error').classList.toggle('visible')
  const elem = document.getElementById('error')
  elem.innerHTML = 'Connection failed, please try later!'
}
