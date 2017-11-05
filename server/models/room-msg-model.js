const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomMsgSchema = mongoose.Schema({
  to: [{
    type: Schema.Types.ObjectId,
    ref: 'room'
  }],
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('roomMsg', roomMsgSchema);

