import React, { useState, useEffect } from "react";

function BookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const dummyBookings = [
      {
        id: 1,
        user: "Rahul",
        pickup: "Bangalore",
        drop: "Airport",
        vehicle: "Auto",
        status: "Pending"
      },
      {
        id: 2,
        user: "Priya",
        pickup: "Whitefield",
        drop: "MG Road",
        vehicle: "Car",
        status: "Confirmed"
      },
      {
        id: 3,
        user: "Kiran",
        pickup: "Electronic City",
        drop: "Majestic",
        vehicle: "Traveller",
        status: "Completed"
      }
    ];

    setBookings(dummyBookings);

  }, []);

  const updateStatus = (id, newStatus) => {

    const updated = bookings.map((booking) => {
      if (booking.id === id) {
        return { ...booking, status: newStatus };
      }
      return booking;
    });

    setBookings(updated);
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
  };

  return (

    <div style={styles.container}>

      <h1>Bookings Management</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr key={booking.id}>

              <td>{booking.id}</td>
              <td>{booking.user}</td>
              <td>{booking.pickup}</td>
              <td>{booking.drop}</td>
              <td>{booking.vehicle}</td>

              <td>

                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(booking.id, e.target.value)
                  }
                >

                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>

                </select>

              </td>

              <td>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

const styles = {

  container: {
    padding: "40px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  }

};

export default BookingsPage;