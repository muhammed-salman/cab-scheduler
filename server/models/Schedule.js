const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const scheduleSchema = new Schema({
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: String
});

// Create the model class
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Export the model
module.exports = Schedule;
