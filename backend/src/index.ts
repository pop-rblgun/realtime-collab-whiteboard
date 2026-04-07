import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configure Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"]
  }
});

// Simple in-memory global state for the whiteboard
// A real app would store this in Redis or a DB
let elements: any[] = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send current state to the new client
  socket.emit('whiteboard-state', elements);

  // When a user adds/modifies an element on the whiteboard
  socket.on('update-element', (element) => {
    // Update local state
    const index = elements.findIndex(e => e.id === element.id);
    if (index === -1) {
      elements.push(element);
    } else {
      elements[index] = element;
    }

    // Broadcast to everyone ELSE
    socket.broadcast.emit('update-element', element);
  });

  // Handle Redux 'Undo' global sync (optional if we want global undo)
  // But usually undo is local to the user's Redux state.
  // We'll trust the clents to send 'update-element' to revert things.

  // Real-time mouse pointers (presence)
  socket.on('cursor-move', (position) => {
    socket.broadcast.emit('cursor-move', { userId: socket.id, position });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Broadcast user disconnected to remove their cursor
    socket.broadcast.emit('user-disconnected', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Real-time Collaborative Backend running on http://localhost:${PORT}`);
});
