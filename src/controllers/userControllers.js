import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema } from "../models/userModel";

const User = mongoose.model("User", userSchema);

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next(); // If User is there then go to next function
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

export const register = (req, res) => {
    const newUser = new User(req.body);

    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    })
}