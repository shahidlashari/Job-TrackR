const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { loadRoom, leaveRoom } = require('./controllers/roomController');
// const userController = require('./controllers/userController');
const { createMessage } = require('./controllers/messageController');

const routes = require('./routes');

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
  console.log('I am connected to the socket!');

  socket.on('loadRoom', (userId, cb) => {
    loadRoom(userId, (roomData) => {
      if (userId) {
        socket.broadcast.emit('userJoin');
      }
      cb(roomData);
    });
  });

  socket.on('leaveRoom', (userId) => {
    leaveRoom(userId, (roomData) => {
      socket.broadcast.emit('userLeft');
      console.log(roomData);
    });
  });

  // socket.on('currentUser', (user, callback) => {
  //   userController.getUser(user, (newUser) => {
  //     callback(newUser);
  //   });
  // });

  // socket.on('getMessage', (callback) => {
  //   messageController.getMessage((messages) => {
  //     callback(messages);
  //   });
  // });

  // socket.on('loadMessage', (message, cb) => {
  //   loadMessage(message, (messageWithUsername) => {
  //     cb(messageWithUsername);
  //   });
  // });

  // socket.on('loadRoomMessages', (cb) => {
  //   loadRoomMessages((roomData) => {
  //     cb(roomData);
  //   });
  // });

  // socket.on('joinChat', (newUser) => {
  //   socket.broadcast.emit('userJoined', newUser);
  // });

  socket.on('createMessage', (message, cb) => {
    createMessage(message, (newMessage) => {
      socket.broadcast.emit('sentMessage', newMessage);
      cb(newMessage);
    });
  });

  socket.on('disconnect', () => {
    console.log('I am disconnected from the socket!');
  });
});

server.listen(PORT);
