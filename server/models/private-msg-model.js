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
  createAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('privateMsg', privateMsgSchema);

