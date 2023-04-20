import joi from "joi";

export const signUpSchema = joi
  .object({
    userName: joi.string().required(),
    email: joi.string.email().required(),
    password :joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    cPassword : joi.ref("password")
  })
  .required();
