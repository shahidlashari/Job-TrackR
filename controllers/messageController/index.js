const { Message } = require('../../models');

module.exports = {
  getMessage: async (callback) => {

  },
  createMessage: async (message, callback) => {
    const { username, text, timeStamp, userId } = message;
    console.log(message);
    const newMessage = await Message.create({
      username,
      text,
      timeStamp,
      userId,
    });
    console.log(newMessage);
  },
};
