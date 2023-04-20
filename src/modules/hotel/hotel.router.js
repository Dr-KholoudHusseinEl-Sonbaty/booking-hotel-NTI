import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as hotelController from "./controller/hotel.js";
const router = Router();

router.get("/",auth, hotelController.getHotelModule);
router.post("/", hotelController.addHotel);
router.put("/:id", auth, hotelController.updateHotel);
router.delete("/:id", auth, hotelController.deleteHotel);
export default router;
