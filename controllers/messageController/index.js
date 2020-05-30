const { Message, Room } = require('../../models');

module.exports = {
  createMessage: async (message, cb) => {
    const { text, userId, username } = message;
    console.log(message);
    const newMessage = await new Message({ text, user: userId, username }).save();
    const room = await Room.findOne({ code: '12345' });
    room.messages.push(newMessage._id);
    await room.save();
    console.log(newMessage);
    cb(newMessage);
  },
};
