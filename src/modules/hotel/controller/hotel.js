import hotelModel from "../../../../DB/model/Hotel.model.js";
import userModel from "../../../../DB/model/Admin.model.js";

export const getHotelModule = async (req, res, next) => {
  const hotels = await hotelModel.find({}).select("-createdAt").populate({
    path: "userId",
    select: "userName",
  });
  return res.json({ message: "hotel module", hotels });
};

export const addHotel = async (req, res, next) => {
  try {
    const { hotelName, rate, address, room, services, userId } = req.body;
    const hotel = await hotelModel.create({
      hotelName,
      rate,
      address,
      room,
      services,
    });
    return res.json({ message: "Done", hotel });
  } catch (error) {
    return res.json({ message: "Catch error", stack: error.stack });
  }
};
export const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const { hotelName, rate, address,room, services, userId } = req.body;
  const hotel = await hotelModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { hotelName, rate, address,room, services },
    { new: true }
  );
  return hotel
    ? res.json({ message: "Done", hotel })
    : res.json({ message: "In-Valid Data " });
};
export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const hotel = await hotelModel.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });
  return hotel
    ? res.json({ message: "Done", hotel })
    : res.json({ message: "In-Valid Data " });
};
