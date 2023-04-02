import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';

// Middleware to authenticate token and cookies
const auth = async (req, res, next) => {
  // Get auth header value
  const authHeader = req.headers['authorization'];
  // Get token from header or cookies
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;
  console.log(token)
  if (token == null) return res.sendStatus(401);

  // Verify token
  jwt.verify(token, "test", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;

    next();
  });
}

export default auth

//   import jwt from "jsonwebtoken";

// const secret = 'test';

// const auth = async (req, res, next) => {
//     try {
//       if (req.headers.authorization) {
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token)
//         const isCustomAuth = token.length < 500;
  
//         let decodedData;
  
//         if (token && isCustomAuth) {      
//             decodedData = jwt.verify(token, secret);
//             if (decodedData) {
//               req.userId = decodedData.id;
//             } else {
//               throw new Error("Invalid token");
//             }
//           } else {
//             decodedData = jwt.decode(token);
//             if (decodedData) {
//               req.userId = decodedData.sub;
//             } else {
//               throw new Error("Invalid token");
//             }
//           } 
//       }
  
//       next();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// export default auth;