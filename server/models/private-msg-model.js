const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateMsgSchema = mongoose.Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: String,
  createAt: {
    type: Date,
    default: new Date()
  },
  msgType: String,
});

module.exports = mongoose.model('privateMsg', privateMsgSchema);

