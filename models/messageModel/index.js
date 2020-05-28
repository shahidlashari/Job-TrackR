const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Message', MessageSchema);
