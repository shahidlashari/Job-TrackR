const { Room } = require('../../models');

module.exports = {
  loadRoom: async (userId, cb) => {
    try {
      const room = await Room.findOne({ code: '12345' });
      // console.log(room);
      if (userId) {
        room.users.push(userId);
        await room.save();
      }
      // console.log(room);
      const roomData = await Room.findOne({ code: '12345' }).populate('users').populate('messages');
      console.log(roomData);
      cb(roomData);
    } catch (e) {
      cb(e);
    }
  },
  leaveRoom: async (userId, cb) => {
    try {
      const room = await Room.findOne({ code: '12345' });
      room.users.pull(userId);
      // console.log(room);
      await room.save();
      cb(room);
    } catch (e) {
      cb(e);
    }
  },
  // loadRoomMessages: async (cb) => {
  //   try {
  //     const roomData = await Room.findOne({ code: '12345' }).populate('users').populate('messages');
  //     console.log(roomData);
  //     cb(roomData);
  //   } catch (e) {
  //     cb(e);
  //   }
  // },
};
