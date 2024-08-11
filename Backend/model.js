const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmpName: String,
  designation: String,
  empId: String,
  img_url: String,
});

const BlogModel = mongoose.model("Employee", employeeSchema);

module.exports = BlogModel;
