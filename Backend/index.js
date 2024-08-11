
var express = require('express');
const cors = require('cors'); 
require('./connection'); 
var BlogModel = require('./model'); 


var app = express();


app.use(express.json());
app.use(cors()); 
app.post("/add", async (req, res) => {
    try {
        await BlogModel(req.body).save();
        res.send({ message: "Employee added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding employee" });
    }
});

app.get("/view", async (req, res) => {
  try {
      var output = await BlogModel.find();
      res.send(output);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching employees" });
  }
});



app.delete("/remove/:id", async (req, res) => {
    try {
        var id = req.params.id;
        await BlogModel.findByIdAndDelete(id);
        res.send({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting employee" });
    }
});


app.put("/update/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var updatedEmployee = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating employee" });
    }
});


app.listen(3500, () => {
    console.log("Port 3500 is up and running");
});
