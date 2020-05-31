const { Room } = require('../../models');

module.exports = {
  loadRoom: async (userId, cb) => {
    try {
      const room = await Room.findOne({ code: '12345' });
      // console.log(room);
      if (userId) {
        room.users.push(userId);
        await room.save();
        if (room.users[room.users.length - 1] === userId) {
          console.log(' I am hit');
          room.users.pull(userId);
          await room.save();
        }
      }
      // console.log(room);
      // if (room.users[room.users.length - 1] === userId) {
      //   room.users.pull(userId);
      //   await room.save();
      // }
      const roomData = await Room.findOne({ code: '12345' }).populate('users').populate('messages');
      // console.log(roomData);
      // console.log(roomData.users);
      // const userIndex = roomData.users[roomData.users.length - 1]['_id'];
      // console.log(userIndex);
      // if (roomData.users[roomData.users.length - 1]['_id'] === userId) {
      //   console.log('I am hit');
      //   roomData.users[roomData.users.length - 1].pull(userId);
      //   await roomData.save();
      //   cb(roomData);
      // } else {
      //   cb(roomData);
      // }
      // console.log(roomData);
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
};
