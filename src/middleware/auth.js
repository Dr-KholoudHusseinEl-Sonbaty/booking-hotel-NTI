import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../utils/GenerateAndVefifyToken.js";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log({ authorization });
    // console.log(authorization.startsWith(process.env.BEARER_KEY));
    if (!authorization?.startsWith("Bearer ")) {
      return res.json({ message: "IN-valid Bearer Token" });
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    console.log(token);
    if (!token) {
      return res.json({ message: "Token is required" });
    }
    const decoded = verifyToken({
      token,
      signature: process.env.TOKEN_SIGNATURE,
    });
    console.log({ decoded });
    const authUser = await userModel
      .findById(decoded.id)
      .select("userName email role");
    if (!authUser) {
      return res.json({ message: "Not register account" });
    }

    req.user = authUser;
    return next();
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      tokenErr: error?.massage,
    });
  }
};

export default auth;
