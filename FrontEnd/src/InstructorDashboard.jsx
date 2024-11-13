// src/components/InstructorDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const InstructorDashboard = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAvailability();
    fetchBookings();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await axios.get("http://localhost:1729/instructor/getData");
      setAvailability(res.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
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

  const addOrEditAvailability = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Editing existing availability
        await axios.put(`http://localhost:1729/instructor//update/${editId}`, {
          date,
          time,
        });
        setAvailability(
          availability.map((avail) =>
            avail.id === editId ? { ...avail, date, time } : avail
          )
        );
        setEditId(null);
      } else {
        // Adding new availability
        const res = await axios.post(
          "http://localhost:1729/instructor/createAvailable",
          { date, time }
        );
        console.log(res);
        setAvailability([
          ...availability,
          {
            date,
            time,
            id: res.data._key.path.segments[1],
          },
        ]);
      }
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error adding/editing availability:", error);
    }
  };

  const deleteAvailability = async (id) => {
    try {
      await axios.delete(`http://localhost:1729/instructor/deleteItem/${id}`);
      setAvailability(availability.filter((avail) => avail.id !== id));
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };

  const editAvailability = (id, current_date, current_time) => {
    setDate(current_date);
    setTime(current_time);
    setEditId(id);
  };

  const confirmHandling = async (type, id) => {
    try {
      if (type === "Add") {
        await axios.put(
          `http://localhost:1729/instructor/updateBooking/${id}`,
          { status: "Approved" }
        );
        setBookings(
          bookings.map((item) =>
            item.id === id ? { ...item, status: "Approved" } : item
          )
        );
      } else if (type === "Delete") {
        await axios.put(
          `http://localhost:1729/instructor/updateBooking/${id}`,
          { status: "Declined" }
        );
        setBookings(bookings.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(`Error updating booking: ${error}`);
    }
  };

  return (
    <div>
      <h1>Instructor Dashboard</h1>
      <form className="form-styles" onSubmit={addOrEditAvailability}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          {editId ? "Edit Availability" : "Add Availability"}
        </button>
      </form>
      <ul className="ul-availiable">
        {availability.map((avail) => (
          <li className="child-div-bookings" key={avail.id}>
            {avail.date} - {avail.time}
            <button
              className="btn btn-primary"
              onClick={() => editAvailability(avail.id, avail.date, avail.time)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteAvailability(avail.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h4>Upcoming Bookings</h4>
      {bookings.length === 0 && <h4>You don't have any booking right now</h4>}
      <div className="parent-div-bookings">
        {bookings.map(
          (booking) =>
            booking.status !== "Declined" && (
              <div className="child-div-bookings" key={booking.id}>
                <div>
                  {booking.date} - {booking.time} by {booking.studentName}
                </div>
                {booking.status === "Waiting" ? (
                  <>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => confirmHandling("Add", booking.id)}
                      >
                        Confirm Booking
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() => confirmHandling("Delete", booking.id)}
                      >
                        Decline Booking
                      </button>
                    </div>
                  </>
                ) : (
                  <div>You have set Meeting With {booking.studentName}</div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;

// import { useState, useEffect } from "react";
// import axios from "axios";
// const InstructorDashboard = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [availability, setAvailability] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   useEffect(() => {
//     fetchAvailability();
//     fetchBookings();
//   }, []);

//   const fetchAvailability = async () => {
//     const res = await axios.get("http://localhost:1729/instructor/getData");
//     setBookings(res.data);
//   };

//   const fetchBookings = async () => {
//     const res = await axios.get("http://localhost:1729/instructor/getBooking");
//     setBookings(res.data);
//   };

//   console.log(bookings);
//   const addAvailability = async (e) => {
//     e.preventDefault();
//     const res = await axios.post(
//       "http://localhost:1729/instructor/createAvailable",
//       { date, time }
//     );
//     console.log(res.data.firestore.databaseId);
//     setAvailability([
//       ...availability,
//       {
//         date,
//         time,
//         id: `${res.data.firestore.databaseId}${time + Math.random(100 * 4)}`,
//       },
//     ]);
//     setDate("");
//     setTime("");
//     console.log(availability);
//   };

//   const deleteAvailability = async (id) => {
//     const res = await axios.delete(
//       `http://localhost:1729/instructor/deleteItem/${id}`
//     );
//     console.log(res);
//     setAvailability(availability.filter((avail) => avail.id !== id));
//   };
//   const confirmHandling = async (type, id) => {
//     if (type == "Add") {
//       const res = await axios.put(
//         `http://localhost:1729/instructor/updateBooking/${id}`,
//         { status: "Approved" }
//       );
//       setBookings(
//         bookings.map((item) => {
//           item.id == id ? { status: "Approved", ...item } : item;
//         })
//       );
//     } else if (type === "Delete") {
//       const res = await axios.put(
//         `http://localhost:1729/instructor/updateBooking/${id}`,
//         { status: "Declined" }
//       );
//       setBookings(bookings.filter((item) => item.id !== id));
//       console.log(type, id);
//     }
//   };
//   return (
//     <div>
//       <h1>Instructor Dashboard</h1>
//       <form className="form-styles" onSubmit={addAvailability}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//         />
//         <button type="submit" className="btn btn-success">
//           Add Availability
//         </button>
//       </form>
//       <ul>
//         {availability.map((avail) => (
//           <li key={avail.id}>
//             {avail.date} - {avail.time}
//             <button onClick={() => deleteAvailability(avail.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <h4>Upcoming Bookings</h4>
//       <div className="parent-div-bookings">
//         {bookings.map(
//           (booking) =>
//             booking.status !== "Declined" && (
//               <div className="child-div-bookings" key={booking.id}>
//                 <div key={booking.id}>
//                   {booking.date} - {booking.time} by {booking.studentName}
//                 </div>

//                 {booking.status === "Waiting" ? (
//                   <>
//                     <div>
//                       <button
//                         className="btn btn-success"
//                         onClick={() => confirmHandling("Add", booking.id)}
//                       >
//                         Confirm Booking
//                       </button>
//                     </div>
//                     <div>
//                       <button
//                         className="btn btn-success"
//                         onClick={() => confirmHandling("Delete", booking.id)}
//                       >
//                         Decline Booking
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div>You have set Meeting With {booking.studentName}</div>
//                 )}
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;
