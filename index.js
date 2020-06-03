require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { loadRoom, leaveRoom, seedRoom } = require('./controllers/roomController');
const { createMessage } = require('./controllers/messageController');

const routes = require('./routes');

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'public/index.html'));
  });
}

app.use(routes);

// This will make it so that passport knows that we have strategies defined
require('./services/passport');

// Connect database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jobTrackR', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (err) => {
  if (err) console.log(err);
});

// Socket.io Connection
io.on('connection', (socket) => {
  // console.log('I am connected to the socket!');

  socket.on('loadRoom', (userId, cb) => {
    loadRoom(userId, (roomData) => {
      if (userId) {
        socket.broadcast.emit('userJoin');
      }
      cb(roomData);
    });
  });

  socket.on('leaveRoom', (userId) => {
    leaveRoom(userId, () => {
      socket.broadcast.emit('userLeft');
      // console.log(roomData);
    });
  });

  socket.on('createMessage', (message, cb) => {
    createMessage(message, (newMessage) => {
      socket.broadcast.emit('sentMessage', newMessage);
      cb(newMessage);
    });
  });

  socket.on('disconnect', () => {
    // console.log('I am disconnected from the socket!');
  });
});

// Invoke room controller function to drop and restart room database
seedRoom();

server.listen(PORT);
