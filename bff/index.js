// signaling-server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Set up server
const app = express();
const server = http.createServer(app);
// console.log('Server created', server);
const io = socketIo(server, {
  cors: {
    origin: "*", // For development only – restrict in production
    methods: ["GET", "POST"]
  }
});

let users = new Map()
// === CHAT NAMESPACE ===
const chat = io.of('/chat')
// const streamConversation = io.of('/chat')


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

// streamConversation.on('connection', socket => {
//   users.set(socket.id, 'idle');
//   console.log('A user connected:', socket.id);
  
//   // Relay signaling messages
//   socket.on('start_conversation', ({ withUserId }) => {
//     userStatus.set(socket.id, 'busy');
//     userStatus.set(withUserId, 'busy');
//     console.log(roomId, `Message from ${socket.id} to ${to}:`, data);
//     streamConversation.to(to).emit('get_message_response', { from: socket.id, data, roomId });
//     // Notify both users, etc.
//   });

//   socket.on('end_conversation', () => {
//     userStatus.set(socket.id, 'idle');
//     // Optionally notify the other user
//   });

//   socket.on('get_idle_users', () => {
//     const idleUsers = Array.from(userStatus.entries())
//       .filter(([id, status]) => status === 'idle' && id !== socket.id)
//       .map(([id]) => id);
//     socket.emit('idleUserList', idleUsers);
//   });

// // Send back the list of all connected clients
//   socket.on('get_all_online_users', () => {
//     console.log('Sending list of connected clients to:', socket.id);
//     const clients = Array.from(chat.sockets.keys());
//     console.log('Sending list of connected clients', clients);
//     socket.emit('userList', clients.filter(id => id !== socket.id));
//   });

//   // Relay offer to the target user
//   // socket.on('offer', ({ to, offer }) => {
//   //   chat.to(to).emit('offer', { from: socket.id, offer })
//   // })

//   // // Relay answer to the target user
//   // socket.on('answer', ({ to, answer }) => {
//   //   chat.to(to).emit('answer', { from: socket.id, answer })
//   // })

//   // // Relay ICE candidate to the target user
//   // socket.on('ice-candidate', ({ to, candidate }) => {
//   //   chat.to(to).emit('ice-candidate', { from: socket.id, candidate })
//   // })

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });

//   socket.on('allDisconnect', () => {
//     for (const [id, socket] of streamConversation.sockets.sockets) {
//       socket.disconnect(true)
//     }
//     console.log('All sockets disconnected.')
//   });

// });

// const server = http.createServer((req, res) => {
//   if (req.url === '/create-file') {
//     fs.writeFile('created-by-server.txt', 'This file was created by the Node.js server.', (err) => {
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error writing file');
//       }
//       res.writeHead(200);
//       res.end('File created successfully!');
//     });
//   } else {
//     res.writeHead(404);
//     res.end('Not found');
//   }
// });

// Start server
const PORT = process.env.PORT || 3080;
server.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
