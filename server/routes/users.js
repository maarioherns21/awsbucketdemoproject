import express from "express";
import { index, login, profile, register, upload } from "../controllers/user.js";
import auth from "../middleware/middleware.js";
const router = express.Router();


router.get("/", index);

router.post("/login" , login);

router.post("/register", upload.single("photo") , register);

router.get('/:id', profile);

router.delete("/:id");

router.patch("/:id")

export default router;


  
  