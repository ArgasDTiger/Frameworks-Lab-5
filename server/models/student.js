const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  group: Number
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
