import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/Admin.model.js";

export const getUserModule = async (req, res, next) => {
  const { gender, age } = req.query;
  const users = await userModel.find({
    $or: [
      {
        $or: [{ gender: gender }, { age: { $gte: age } }],
      },
      { confirmEmail: true },
    ],
  });
  return res.json({ message: "Done", users });
};
export const profile = async (req, res, next) => {
  try {
    console.log({ user: req.user });

    const user = await userModel.findById(req.user._id);
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    console.log(req.user);

    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    return user
      ? res.json({ message: "Done", user })
      : res.json({ message: "In-valid Account Id" });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user._id);
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};
