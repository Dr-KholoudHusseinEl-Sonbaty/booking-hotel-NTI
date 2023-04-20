import jwt from "jsonwebtoken";
import { generateToken } from "../../../utils/GenerateAndVefifyToken.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import userModel from "../../../../DB/model/User.model.js";
import adminModel from "../../../../DB/model/Admin.model.js";

export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};

export const signup = async (req, res, next) => {
  try {
    const { email, adminName, password, cPassword,phone } = req.body;
    // console.log({ email, userName, password });

    if (password != cPassword) {
      return res.json({ message: "password NotMatch" });
    }

    const checkUser = await adminModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: "Email Exist" });
    }
    const hashPassword = hash({ plaintext: password });
    const user = await adminModel.create({
      email: email,
      adminName,
      password: hashPassword,
      phone
    });
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "catch error", error, stack: error.stack });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.json({ message: "In-valid Email" });
    }
    const match = compare({ plaintext: password, hashValue: user.password });
    console.log(match);
    if (!match) {
      return res.json({ message: "In-valid Password" });
    }
    const token = generateToken({
      payload: { id: user._id, isLoggedIn: true },
      expiresIn: 60 * 60 * 24 * 30,
    });
    return res.json({ message: "Done", token });
  } catch (error) {
    return res.json({ message: "catch error", error, stack:error.stack });
  }
};



// user




export const signupAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName,email, password,cPassword, gender,phone, } = req.body;
    // console.log({ email, userName, password });

    if (password != cPassword) {
      return res.json({ message: "password NotMatch" });
    }

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: "Email Exist" });
    }
    const hashPassword = hash({ plaintext: password });
    const user = await userModel.create({
      firstName,
      email,
      lastName,
      password: hashPassword,
      phone,
      gender
    });
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "catch error", error, stack: error.stack });
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "In-valid Email" });
    }
    // console.log({ FE: password, DB: user.password });
    const match = compare({ plaintext: password, hashValue: user.password });
    console.log(match);
    if (!match) {
      return res.json({ message: "In-valid Password" });
    }
    const token = generateToken({
      payload: { id: user._id, isLoggedIn: true },
      expiresIn: 60 * 60 * 24 * 30,
    });
    return res.json({ message: "Done", token });
  } catch (error) {
    return res.json({ message: "catch error", error, stack:error.stack });
  }
};