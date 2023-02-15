import express from "express";
import rateLimiter from "express-rate-limit";

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 25,
  message:
    "Too many requests from this IP address, please try again after 15 minutes...",
});

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/logout").get(logoutUser);
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

export default router;
