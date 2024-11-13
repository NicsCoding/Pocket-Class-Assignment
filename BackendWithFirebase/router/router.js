const express = require("express");
const Router = express.Router();
const BookingMethod = require("../controller/bookingMethods.js");
const MethodHandler = require("../controller/methods.js");
const { createUser, signinUser } = require("../controller/createUser.js");
Router.post("/createAvailable", MethodHandler.setAvailability)
  .get("/getData", MethodHandler.getAvailability)
  .get("/getBooking", BookingMethod.getBookings)
  .post("/addBooking", BookingMethod.addBooking)
  .put("/update/:id", MethodHandler.updateTask)
  .post("/creatingUser", createUser)
  .put("/updateBooking/:id", BookingMethod.updateBookingStatus)
  .delete("/deleteItem/:id", MethodHandler.deleteAvailablity)
  .delete("/deleteBooking/:id", BookingMethod.deleteBooking);
exports.router = Router;
