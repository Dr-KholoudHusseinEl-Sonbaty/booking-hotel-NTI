import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import hotelRouter from "./modules/hotel/hotel.router.js";
import connectDB from "../DB/connection.js";
import cors from "cors";

const initApp = (app, express) => {
  app.use(express.json({}));
  app.use(cors());
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", authRouter);
  app.use("/authAdmin", authRouter);
  app.use("/user", userRouter);
  app.use("/hotel", hotelRouter);
  app.use("*", (req, res) => {
    return res.json({ message: "404 Page Not Found" });
  });
  connectDB();
};

export default initApp;
