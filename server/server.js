import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "./Models/User.js";
import todoList from "./Models/TodoList.js";
import bcrypt from "bcrypt";
import cors from 'cors';
import session from "express-session";

dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});


function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  res.status(401).send('Unauthorized');
}


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
        req.session.user = user;
        req.session.save();
        // console.log(req.session);
        res.status(200).json({Login: true, message: "Login successful" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
        }
});


app.get('/dashboard', isAuthenticated, (req, res) => {
  console.log(req.session.user);
  res.status(200).json({ message: 'You are authenticated', user: req.session.user });
});


app.post('/add',isAuthenticated, async (req, res) => {
  try {
    const user_id = req.session.user._id;
    const {text} = req.body;
    const todo = new todoList({ user_id:user_id, text:text });
    await todo.save();
    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Todo addition failed" });
  }
});

app.get('/getList', isAuthenticated, async (req, res) => {
  try {
    const user_id = req.session.user._id;
    const todo = await todoList.find({ user_id });
    res.status(200).json({ message: "Todo added successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Todo addition failed" });
  }
});

app.post('/delete', isAuthenticated, async (req, res) => {
  try {
    const user_id = req.session.user._id;
    const {text} = req.body;
    console.log(user_id, text);
    const findmeassge = await todoList.findOneAndDelete({ user_id, text });
    console.log("Deleted Todo:", findmeassge);
    if(!findmeassge){
      return res.status(400).json({ error: "task does not exist" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Todo deletion failed" });
  }
});



app.post('/logout', (req, res) => {
  try{
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Logout failed');
      } else {
        res.status(200).send('Logout successful');
      }
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Logout failed');
  }
});


  
app.listen(port, () => {
  console.log("Server started on port " + port);
});