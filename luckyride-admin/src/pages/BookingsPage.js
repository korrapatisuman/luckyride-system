import React, { useState, useEffect } from "react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking as deleteBookingAPI
} from "../services/api";

function BookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await deleteBookingAPI(id);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return styles.statusConfirmed;
      case "CANCELLED":
        return styles.statusCancelled;
      case "PENDING":
        return styles.statusPending;
      case "COMPLETED":
        return styles.statusCompleted;
      default:
        return {};
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Bookings Management</h1>

      <div style={styles.card}>
      <table style={styles.table}>

  <thead style={styles.tableHead}>
    <tr>
      <th style={styles.cell}>ID</th>
      <th style={styles.cell}>User</th>
      <th style={styles.cell}>Pickup</th>
      <th style={styles.cell}>Drop</th>
      <th style={styles.cell}>Vehicle</th>
      <th style={styles.cell}>Status</th>
      <th style={styles.cell}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {bookings.map((booking) => (
      <tr key={booking.id} style={styles.row}>

        <td style={styles.cell}>{booking.id}</td>
        <td style={styles.cell}>{booking.user_phone || "User"}</td>
        <td style={styles.cell}>{booking.pickup_location}</td>
        <td style={styles.cell}>{booking.drop_location}</td>
        <td style={styles.cell}>{booking.vehicle_type}</td>

        <td style={styles.cell}>
          <span style={{
            ...styles.statusBadge,
            ...(booking.status === "CONFIRMED" && styles.statusConfirmed),
            ...(booking.status === "CANCELLED" && styles.statusCancelled),
            ...(booking.status === "PENDING" && styles.statusPending),
            ...(booking.status === "COMPLETED" && styles.statusCompleted)
          }}>
            {booking.status}
          </span>
        </td>

        <td style={styles.actionCell}>

  <select
    style={styles.dropdown}
    value=""
    onChange={(e) => {
      const action = e.target.value;

      if (action === "CONFIRMED") {
        updateStatus(booking.id, "CONFIRMED");
      } else if (action === "CANCELLED") {
        updateStatus(booking.id, "CANCELLED");
      } else if (action === "DELETE") {
        deleteBooking(booking.id);
      }
    }}
  >
    <option value="">Action</option>
    <option value="CONFIRMED">✅ Approve</option>
    <option value="CANCELLED">❌ Reject</option>
    <option value="DELETE">🗑 Delete</option>
  </select>

</td>

      </tr>
    ))}
  </tbody>

</table>
      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    backgroundColor: "#f1f5f9",
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#1e293b"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  },

  thead: {
    backgroundColor: "#f8fafc"
  },

  row: {
    borderBottom: "1px solid #e5e7eb",
    transition: "0.2s"
  },

  cell: {
    padding: "12px 10px",
    textAlign: "left"
  },

  headerCell: {
    padding: "12px 10px",
    textAlign: "left",
    fontWeight: "600",
    color: "#475569"
  },

  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },

  statusConfirmed: {
    background: "#dcfce7",
    color: "#166534"
  },

  statusCancelled: {
    background: "#fee2e2",
    color: "#991b1b"
  },

  statusPending: {
    background: "#fef9c3",
    color: "#854d0e"
  },

  statusCompleted: {
    background: "#dbeafe",
    color: "#1e40af"
  },

  actionCell: {
    display: "flex",
    gap: "8px"
  },

  dropdown: {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
  cursor: "pointer",
  fontSize: "13px",
  outline: "none"
},

  approveBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  },

  rejectBtn: {
    background: "#facc15",
    color: "#000",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  }

};

export default BookingsPage;