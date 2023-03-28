import mongoose from "mongoose";
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  name: String,
  body: String,
  creator: String,
  fileImage: { type:String,  required: false },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

const Tape = mongoose.model("Tape", moviesSchema);

export default Tape;
