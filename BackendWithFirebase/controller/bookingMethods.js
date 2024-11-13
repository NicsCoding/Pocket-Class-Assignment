const { response } = require("express");
const { app, db } = require("../firebase");
const {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} = require("firebase/firestore");
const collectionData = collection(db, "bookings");
exports.getBookings = async (req, res) => {
  try {
    let availableData;
    getDocs(collectionData).then((response) => {
      availableData = response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      res.status(200).json(availableData);
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addBooking = async (req, res) => {
  try {
    console.log("I am here");
    addDoc(collectionData, req.body)
      .then((response) => {
        res.status(201).json({ message: "Data Created:" });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const docToUpdate = doc(db, "bookings", id);
    updateDoc(docToUpdate, req.body)
      .then((response) => {
        res.status(200).json({ message: "Updated the status" });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Can't Update The status try again later:" });
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("I was here");
    const docTodelete = doc(db, "bookings", id);
    deleteDoc(docTodelete)
      .then((response) => {
        res.status(200).json({ message: "deletedSuccesfully" });
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
