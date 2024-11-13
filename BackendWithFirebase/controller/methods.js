const { response } = require("express");
const { app, db } = require("../firebase");
const {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} = require("firebase/firestore");
const collectionData = collection(db, "available");
exports.setAvailability = (req, res) => {
  try {
    addDoc(collectionData, req.body)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err.message));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAvailability = async (req, res) => {
  try {
    let availableData;
    getDocs(collectionData)
      .then((response) => {
        availableData = response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        res.status(200).json(availableData);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const docToUpdate = doc(db, "available", id);
    updateDoc(docToUpdate, req.body)
      .then((response) => {
        res.status(200).json({ message: "Edited" });
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error:" });
  }
};
exports.deleteAvailablity = (req, res) => {
  try {
    const { id } = req.params;
    const docTodelete = doc(db, "available", id);
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
