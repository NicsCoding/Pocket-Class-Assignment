import axios from "axios";
import React, { useState } from "react";

const InfoModel = ({ setClose, dataToShow }) => {
  const [realTimeData, setRealTimeData] = useState(dataToShow);
  const deleteHandler = async (date, time, id) => {
    await axios.delete(`http://localhost:1729/instructor/deleteBooking/${id}`);
    alert(`Booking Deleted for ${date} at ${time}`);
    setRealTimeData(realTimeData.filter((item) => item.id !== id));
  };
  return (
    <div className="modal-background" onClick={() => setClose(false)}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
        <h2>Booking Information</h2>
        <div className="slots-container">
          {realTimeData.map((slot) => (
            <div key={slot.id} className="slot-item">
              <p>Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              <p>Status: {slot.status}</p>
              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(slot.date, slot.time, slot.id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
        <button className="btn-close" onClick={() => setClose(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModel;
