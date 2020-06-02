const { Room, Message } = require('../../models');

module.exports = {
  loadRoom: async (userId, cb) => {
    try {
      const room = await Room.findOne({ code: '12345' });
      if (userId) {
        room.users.push(userId);
        await room.save();
      }
      const roomData = await Room.findOne({ code: '12345' }).populate('users').populate('messages');
      cb(roomData);
    } catch (e) {
      cb(e);
    }
  },
  leaveRoom: async (userId, cb) => {
    try {
      const room = await Room.findOne({ code: '12345' });
      room.users.pull(userId);
      await room.save();
      cb(room);
    } catch (e) {
      cb(e);
    }
  },
  seedRoom: async () => {
    try {
      await Room.deleteMany();
      await Message.deleteMany();
      await new Room({ text: 'Career and Advice Chat', code: '12345' }).save();
    } catch (e) {
      if (e) throw e;
    }
  },
};
