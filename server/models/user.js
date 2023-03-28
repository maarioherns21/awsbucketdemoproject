import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
  bio: String,
  image: String,
  createdAt: { type: Date, default: new Date() },
});

const Person = mongoose.model("Person", userSchema);

export default Person;
