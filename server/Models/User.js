import mongoose from "mongoose";

import session from "express-session";
import passportlocalmongoose from "passport-local-mongoose";
import passport from "passport";


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


userSchema.plugin(passportlocalmongoose,{ usernameField: "email" });


const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


export default User;