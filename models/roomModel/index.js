const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = model('Room', RoomSchema);
