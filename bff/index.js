// signaling-server.js
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const streamCall = require('./streamCall')
const textChat = require('./textChat')

// Set up server
const app = express()
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: "*", // For development only – restrict in production
    methods: ["GET", "POST"]
  }
})

// Initialize your stream call logic
streamCall(io)
textChat(io)
// Start server
app.get('/', (req, res) => {
  res.send('Signaling server is running')
})

const PORT = process.env.PORT || 3080
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signaling server running on http://localhost:${PORT}`)
})

