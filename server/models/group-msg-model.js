const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMsgSchema = mongoose.Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
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

module.exports = mongoose.model('groupMsg', groupMsgSchema);

