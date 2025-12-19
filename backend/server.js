const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Complaint = require("./models/Complaint");
const User = require("./models/User");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/campusApp")
.then(() => console.log("MongoDB Connected"));

app.post("/complaint", async (req, res) => {
    const { roll, department, problem } = req.body;

    const newComplaint = new Complaint({
        roll,
        department,
        problem
    });

    await newComplaint.save();
    res.json({ message: "Complaint Submitted Successfully " });
});



app.get("/admin/complaints", async (req, res) => {
    const complaints = await Complaint.find();
    res.json(complaints);
});

app.put("/admin/close/:id", async (req, res) => {
    await Complaint.findByIdAndUpdate(req.params.id, {
        status: "Closed"
    });
    res.json({ message: "Complaint Closed Successfully " });
});

app.post("/signup", async (req, res) => {
  const { roll, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.json({ message: "User already exists" });
  }

  await User.create({ roll, email, password });
  res.json({ message: "Signup successful" });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    roll: user.roll
  });
});


app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Fixed admin credentials
  const ADMIN_EMAIL = "admin@college.com";
  const ADMIN_PASSWORD = "admin123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ message: "Admin login successful" });
  } else {
    res.json({ message: "Invalid admin credentials" });
  }
});









app.listen(5000, () => {
    console.log("Server running on port 5000");
});
