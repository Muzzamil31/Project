const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: String, // UUID for frontend consistency
  name: String,
  position: String,
  department: String,
  email: String,
  photo: String, // filename of uploaded photo
});

module.exports = mongoose.model('Employee', employeeSchema);