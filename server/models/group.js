const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  number: Number,
  subgroupLetter: String
});

module.exports = mongoose.model('Group', GroupSchema);
