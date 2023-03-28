import Tape from "../models/movie.js";
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from "../s3.mjs";
import dotenv from "dotenv"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import accepts from "accepts"
const s3 = new S3Client();

import { v4 as uuid } from "uuid";


dotenv.config();

const bucket = process.env.AWS_BUCKET
// import multerS3 from 'multer-s3';
// import AWS from 'aws-sdk';


///-------------AWS upload---------------- /////
// const s3 = new AWS.S3({
//   // Set your AWS access key and secret here
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const imgconfig = multerS3({
//   s3,
//   bucket: "fulltank",
//   acl: 'public-read',
//   metadata: (req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     cb(null, `image-${Date.now()}.${file.originalname}`);
//   },
// });

// const isImage = (req, file, callback) => {
//   if (file.mimetype.startsWith("image")) {
//     callback(null, true);
//   } else {
//     callback(new Error("Only images are allowed."));
//   }
// };

// export const upload = multer({
//   storage: imgconfig,
//   fileFilter: isImage,
// });



///-------------AWS upload---------------- /////

const storage = memoryStorage();
export const upload = multer({ storage });


export const index = async (req, res) => {
  try {
    const movies = await Tape.find();

    res.status(200).json(movies);
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: error.message });
  }
};


export const createMovie = async (req, res) => {
  try {
    const { name, creator: userId , body } = req.body;
    const { file } = req;
    const accept = accepts(req);
    const imageType = accept.type('avif', 'webp');

    const key1 = `${userId}/${uuid()}.${imageType}`;
    
   //this  sents the props for image convertion and returns the key
    const { key } = await uploadToS3({key1, file , imageType});

    const newMovie = new Tape({ name, body, creator: userId, fileImage: key });

    console.log(newMovie);

    const saveMovie = await newMovie.save();

    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(200).json({ saveMovie, key });
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: error.message });
  }
};



export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    const movie = await Tape.findById(id);
    
    await s3.send(new DeleteObjectCommand({
      Bucket: bucket,
      Key: movie.fileImage
    }));
    
    const data = await Tape.findByIdAndDelete(id);

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: error.message });
  }
};


export const updateMovie = async (req, res) => {
  try {
    const movie = req.body;
    const { id } = req.params;
    const updateMovie = { ...movie, _id: id };

    const data = await Tape.findByIdAndUpdate(id, updateMovie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: error.message });
  }
};


export const likeMovie = async (req, res) => {
  try {
    const { like } = req.body;
    const { id } = req.params;

    const movie = await Tape.findById(id);

    movie.likes.push(like);

    const data = await Tape.findByIdAndUpdate(id, movie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(200).json({ message: error.message });
  }
};

export const commentMovie = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;

    const movie = await Tape.findById(id);

    movie.comments.push(comment);

    const data = await Tape.findByIdAndUpdate(id, movie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(200).json({ message: error.message });
  }
};

