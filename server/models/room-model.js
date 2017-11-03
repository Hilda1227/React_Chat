const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema({
  name: 'xxx',
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'roomMsg'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('room', roomSchema);

