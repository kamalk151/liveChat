module.exports = (io) => {
  let videoUsers = new Map()
  // === CHAT NAMESPACE ===
  const streamConversation = io.of('/video')

  streamConversation.on('connection', socket => {
    videoUsers.set(socket.id, 'idle')
    console.log('A video user connected:', socket.id)  

    // Relay signaling messages
    socket.on('start_conversation', ({ to }) => {
      videoUsers.set(socket.id, 'busy')
      videoUsers.set(to, 'busy')
      console.log('call started', socket.id, 'to', to)
      socket.emit('conversation_started')
    })

    socket.on('release_users', ({ to }) => {
      videoUsers.set(to, 'idle')
      socket.emit('get_idle_users')
      // Optionally notify the other user
    })

    socket.on('get_idle_users', () => {
      const idleUsers = Array.from(videoUsers.entries())
        .filter(([id, status]) => status === 'idle' && id !== socket.id)
        .map(([id]) => id)
      console.log('Idle users:', idleUsers)
      socket.emit('idleUserList', idleUsers)
    })

  // Send back the list of all connected clients
    socket.on('get_all_online_users', () => {
      const clients = Array.from(videoUsers.entries())
        .filter(([id]) => id !== socket.id)
      console.log('Sending list of vedio connected clients', clients)
      socket.emit('userList', clients)
    })
  
    // Relay offer to the target user
    socket.on('offer', ({ to, offer }) => {
      // console.log('===offer-to', to, '===pffer--', offer)
      streamConversation.to(to).emit('offer', { from: socket.id, offer })
    })

    // Relay answer to the target user
    socket.on('answer', ({ to, answer }) => {
      streamConversation.to(to).emit('answer', { from: socket.id, answer })
    })

    // Relay ICE candidate to the target user
    socket.on('ice-candidate', ({ to, candidate }) => {
      streamConversation.to(to).emit('ice-candidate', { from: socket.id, candidate })
    })

    socket.on('disconnect', () => {
      videoUsers.delete(socket.id);
      console.log('videoUsers disconnected:', socket.id)
    })

    socket.on('allDisconnect', () => {
      for (const [id, socket] of streamConversation.sockets) {
        socket.disconnect(true)
      }
      videoUsers.clear()
      console.log('All sockets disconnected.')
    })
  })
}