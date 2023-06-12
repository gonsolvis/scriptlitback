const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    /* email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    }, */
    username: {
      type: String,
      required: [true, "Username is required."],
    },
   /*  password: {
      type: String,
      required: [true, "Password is required."],
    }, */
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required."],
    },
    avatar: {
      type:String,
      default: "https://res.cloudinary.com/dxk04cijr/image/upload/v1686250536/Scriptlit/001-user-avatar_f3vr47.png"
    },
     nativelanguage: {
      type:String,
      required : true
    } 
    

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
