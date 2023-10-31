const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: 'University', 
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
