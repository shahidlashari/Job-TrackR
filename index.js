const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { loadRoom, leaveRoom } = require('./controllers/roomController');
// const userController = require('./controllers/userController');
// const messageController = require('./controllers/messageController');

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
// io.on('connection', (socket) => {
//   console.log('I am connected to the socket!');

//   socket.on('currentUser', (user, callback) => {
//     userController.getUser(user, (newUser) => {
//       callback(newUser);
//     });
//   });

//   socket.on('getMessage', (callback) => {
//     messageController.getMessage((messages) => {
//       callback(messages);
//     });
//   });

//   socket.on('joinChat', (newUser) => {
//     socket.broadcast.emit('userJoined', newUser);
//   });

//   socket.on('createMessage', (message, callback) => {
//     messageController.createMessage(message, (newMessage) => {
//       socket.broadcast.emit('sentMessage', newMessage);
//       callback(newMessage);
//     });
//   });

//   socket.on('leaveRoom', (data) => {
//     console.log(data);
//     socket.broadcast.emit('userLeft', data);
//   });


//   socket.on('disconnect', () => {
//     console.log('I am disconnected from the socket!');
//   });
// });
server.listen(PORT);
// app.listen(PORT);
