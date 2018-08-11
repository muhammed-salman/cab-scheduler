const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  id: Number,
  startTime: String,
  endTime: String,
  zone: {
    type: Schema.Types.ObjectId,
    ref: 'Zone'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    default: null
  },
  date: String,
  status: String,
  waitlist: []
});

// Create the model class
const Slot = mongoose.model('Slot', slotSchema);

// Export the model
module.exports = Slot;
