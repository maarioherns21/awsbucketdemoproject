import express from "express";
import { commentMovie, createMovie, deleteMovie, index, likeMovie, updateMovie, upload } from "../controllers/movies.js";
const router = express.Router();


router.get("/", index);

router.post("/add", upload.single("photo"), createMovie);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

router.post("/:id/comments", commentMovie);

router.post("/:id/likes", likeMovie);



export default router;
