const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'Faculty', 
  }],
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
