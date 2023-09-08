import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "./Models/User.js";
// import Todolist from "./Models/Todolist.js";
import bcrypt from "bcrypt";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const {email, password} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if(email.length<=0 || password.length<=0){
        return res.status(400).json({ error: "User Email or password Empty!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});


app.post("/login", async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "User does not exist" });
        }
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
        }
});

  

app.listen(port, () => {
  console.log("Server started on port " + port);
});
