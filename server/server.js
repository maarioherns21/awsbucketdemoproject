import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import routerIndex from "./routes/index.js";
import userIndex from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());

app.use("/api/movies", routerIndex);
app.use("/api/user", userIndex);


const PORT = process.env.PORT;

mongoose.set(`strictQuery`, false);

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(` express is listening on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
