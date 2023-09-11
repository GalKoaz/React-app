import mongoose from "mongoose";
import passportlocalmongoose from "passport-local-mongoose";
import passport from "passport";

const todoSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
});


todoSchema.plugin(passportlocalmongoose);

const todoList = mongoose.model('todoList', todoSchema);

passport.use(todoList.createStrategy());
passport.serializeUser(todoList.serializeUser());
passport.deserializeUser(todoList.deserializeUser());


export default todoList;