import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import axios from "axios";
import InfoModel from "./InfoModel";
const StudentDashboard = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    fetchAvailableSlots();
  }, []);
  const [submitInfoBar, setSubmitInfoBar] = useState(false);
  const fetchAvailableSlots = async () => {
    const res = await axios.get("http://localhost:1729/instructor/getData");
    setAvailableSlots(res.data);
  };
  const bookOrDelete = async (id, date, time, type) => {
    if (type === "add") {
      await axios.post("http://localhost:1729/instructor/addBooking", {
        date,
        time,
        studentName,
        status: "Waiting",
      });
      alert(`Booking confirmed for ${date} at ${time}`);
    } else if (type === "delete") {
      await axios.delete(
        `http://localhost:1729/instructor/deleteBooking/${id}`
      );
      alert(`Booking Undo for ${date} at ${time}`);
    }
  };
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1729/instructor/getBooking"
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const bookedOrNot = (slot) => {
    const value = bookings.some((item) => item.id === slot.id);
    console.log(value);
  };
  useEffect(() => {
    fetchBookings();
    fetchAvailableSlots();
  }, [submitInfoBar]);
  console.log(bookings);
  return (
    <>
      <div className="container">
        <h2 className="title">Student Dashboard</h2>
        <div>
          <button
            onClick={() => setSubmitInfoBar(true)}
            className="btn btn-dark"
          >
            Info About Your Bookings
          </button>
        </div>
        {availableSlots.length <= 0 ? (
          <div>Sorry There Is no Slots For You</div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{
                marginBottom: "20px",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <ul className="slot-list">
              {availableSlots.map((slot) => (
                <li key={slot.id} className="slot-item">
                  {slot.date} - {slot.time}
                  {bookedOrNot(slot) ? (
                    <button
                      onClick={() =>
                        bookOrDelete(slot.id, slot.date, slot.time, "delete")
                      }
                      className="button"
                    >
                      Undo Booking
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        bookOrDelete(slot.id, slot.date, slot.time, "add")
                      }
                      className="button"
                    >
                      Book Slot
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {submitInfoBar && (
        <InfoModel setClose={setSubmitInfoBar} dataToShow={bookings} />
      )}
    </>
  );
};

export default StudentDashboard;
