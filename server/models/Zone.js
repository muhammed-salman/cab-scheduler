const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const zoneSchema = new Schema({
   name: { type: String, unique: true }
});

// Create the model class
const Zone = mongoose.model('Zone', zoneSchema);

// Export the model
module.exports = Zone;
