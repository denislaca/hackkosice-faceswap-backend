import createObserver from './observer'
import Stats from 'stats.js'
import Peer from 'peerjs'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'))
setTimeout(async () => {
  createObserver(rootElement)
  await document.getElementById('loading').classList.toggle('visible')
}, 1500)

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const peer = new Peer(uuidv4(), {host: '10.236.255.137', port: 8080, path: '/api'})
peer.on('connection', (data) => console.log(data))
if (process.env.NODE_ENV === 'development') {
  const stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom)

  window.requestAnimationFrame(function loop() {
    stats.update()
    window.requestAnimationFrame(loop)
  })
}
