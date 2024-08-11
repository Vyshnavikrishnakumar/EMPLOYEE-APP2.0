const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://user:1234@cluster0.hvd8hmq.mongodb.net/crud1?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("DB connection error:", error);
  });
