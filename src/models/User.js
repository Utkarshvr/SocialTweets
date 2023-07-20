import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  //   Additional
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  numPosts: {
    type: Number,
    default: 0,
  },
});

const User = models.User || model("User", userSchema);
export default User;
