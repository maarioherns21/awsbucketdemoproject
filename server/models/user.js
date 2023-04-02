import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId : String,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  bio: String,
  fileImage: { type: String, required: false },
  createdAt: { type: Date, default: new Date() },
});

const Person = mongoose.model("Person", userSchema);

export default Person;
