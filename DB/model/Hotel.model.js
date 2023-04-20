import { Schema, model, Types } from "mongoose";
const hotelSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    room: {
      type: Number,
    },
    services: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const hotelModel = model("Hotel", hotelSchema);
export default hotelModel;
