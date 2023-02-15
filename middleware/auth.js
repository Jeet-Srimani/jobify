import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnAuthenticatedError("You are not authenticated!");
  // }
  // const token = authHeader.split(" ")[1];

  //COOKIE 
  const token = req.cookies.token;

  if(!token) {
    throw new UnAuthenticatedError('Authentication failure!')
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
   
    const testUser = payload.userId === '63eab880457ee9fdd980e9c3';
    req.user = { userId: payload.userId, testUser };

  } catch (err) {
    throw new UnAuthenticatedError("You are not authenticated!");
  }
  next();
};

export default auth;
