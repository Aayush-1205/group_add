// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://devil:evilatlas514@cluster1.urdfqre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const groupRoutes = require("./Routes/groups");
app.use("/api/groups", groupRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
