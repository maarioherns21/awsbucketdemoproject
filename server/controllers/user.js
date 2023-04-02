import Person  from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from "../s3.mjs";
import dotenv from "dotenv"
import { S3Client } from "@aws-sdk/client-s3";
import accepts from "accepts"
const s3 = new S3Client();

import { v4 as uuid } from "uuid";


dotenv.config();

const bucket = process.env.AWS_BUCKET

const storage = memoryStorage();
export const upload = multer({ storage });

export const index = async (req, res) => {
  try {
    const users = await Person.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ message: error.message });
  }
};



export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await Person.findOne({ email });
  
      if (!user) return res.status(401).json({ message: "Invalid email or password" });
    
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ token, user: { id: user._id , email: user.email , image: user.fileImage, bio: user.bio, username: user.username } });
    } catch (error) {
      console.error(error.message);
  
      res.status(500).json({ message: 'Server error' });
    }
  };



export const register = async (req, res) => {
    try {
      const { email, password, username, bio } = req.body;
      const { file } = req;
  
      // Check if user with the given email already exists
      const existingUser = await Person.findOne({ email });
      
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }


  
      // Hash the password before storing it in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
     

        //-----aws -----------//
      // aws bucket upload  and reformated pg to avif file 
        const accept = accepts(req);
        const imageType = accept.type('avif', 'webp');

        const key1 = `${username}/${uuid()}.${imageType}`;
    
     //this  sents the props for image convertion and returns the key
      const { key: fileImage } = await uploadToS3({key1, file , imageType});
         //-----aws -----------//

      // Create a new user object and save it to the database
      const newUser = new Person({ email, password, username , bio, fileImage , password: hashedPassword });
       
      const savedUser = await newUser.save();

      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

   
      res.status(200).json({ token, user: { id: savedUser._id , email: savedUser.email , image: savedUser.fileImage, bio: savedUser.bio, username: savedUser.username } });
    } catch (error) {

      console.error(error.message);

      res.status(500).json({ message: 'Server error' });
    }
  };



  export const profile = async (req, res) => {
  try {

    const userId = req.params.id

    const person = await Person.findById(userId).select('-password');
     
    
    res.status(200).json(person)
    
  } catch (error) {
    console.log(error)

    res.status(404).json({message:  error.message})
  }
  };
  
    // try {
    //   const userId = req.cookies.token;
  
    //   if (!userId) {
    //     return res.status(401).json({ message: 'User ID cookie not found' });
    //   }
  
    //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    //   const person = await Person.findById(userId).select('-password');
  
    //   if (!person) {
    //     return res.status(404).json({ message: `Could not find user with ID ${userId}` });
    //   }
  
    //   res.json(person);
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).send('Server Error');
    // }
  