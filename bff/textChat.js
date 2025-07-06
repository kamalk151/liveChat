module.exports = (io) => {
  // Map to keep track of user statuses
  let users = new Map()
  // === CHAT NAMESPACE ===
  const chat = io.of('/chat')
  const streamConversation = io.of('/video')


  // Testing and release other user if conversation goes end
  chat.on('connection', socket => {
    users.set(socket.id, 'idle')
    console.log('A user connected:', socket.id)  
    // Relay signaling messages
    socket.on('start_conversation', ({ to, roomId, data }) => {
      users.set(socket.id, 'busy')
      users.set(to, 'busy') 
      chat.to(to).emit('conversation_started', { from: socket.id, roomId, data, to })
    })

    socket.on('message', ({ to, roomId, data }) => {
      console.log(roomId, `Message from ${socket.id} to ${to}:`, data)
      console.log('list user', users)
      chat.to(to).emit('get_message_response', { from: socket.id, data, roomId })
    })

    socket.on('release_users', ({ to }) => {
      users.set(to, 'idle')
      console.log(to, 'list user', users)
      socket.emit('get_idle_users')
      // Optionally notify the other user
    })

    socket.on('get_idle_users', () => {
      const idleUsers = Array.from(users.entries())
        .filter(([id, status]) => status === 'idle' && id !== socket.id)
        .map(([id]) => id)
      console.log('Idle users:', idleUsers)
      socket.emit('idleUserList', idleUsers)
    })

  // Send back the list of all connected clients
    socket.on('get_all_online_users', () => {
      const clients = Array.from(users.entries())
        .filter(([id]) => id !== socket.id)
      console.log('Sending list of connected clients', clients)
      socket.emit('userList', clients.filter(id => id !== socket.id))
    });

    // show typing status
    socket.on('typing', ({ to, roomId }) => {
      socket.to(to).emit('typing', { from: socket.id, roomId })
    })

    socket.on('stop_typing', ({ to, roomId }) => {
      socket.to(to).emit('stop_typing', { from: socket.id, roomId })
    })

    // Relay offer to the target user
    // socket.on('offer', ({ to, offer }) => {
    //   chat.to(to).emit('offer', { from: socket.id, offer })
    // })

    // // Relay answer to the target user
    // socket.on('answer', ({ to, answer }) => {
    //   chat.to(to).emit('answer', { from: socket.id, answer })
    // })

    // // Relay ICE candidate to the target user
    // socket.on('ice-candidate', ({ to, candidate }) => {
    //   chat.to(to).emit('ice-candidate', { from: socket.id, candidate })
    // })

    socket.on('disconnect', () => {
      users.delete(socket.id);
      console.log('User disconnected:', socket.id)
    })

    socket.on('allDisconnect', () => {
      // console.log('chats allDisconnect called', chat.sockets);
      for (const [id, socket] of chat.sockets) {
        socket.disconnect(true)
      }
      users.clear()
      console.log('All sockets disconnected.')
    })

  })

}
