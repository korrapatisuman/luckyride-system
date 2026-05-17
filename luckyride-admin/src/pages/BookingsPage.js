import React, { useState, useEffect } from "react";

import {
  getAllBookings,
  updateBookingStatus,
  deleteBookingById,
  assignDriver
} from "../services/api";

import API from "../services/api";

function BookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverInputs, setDriverInputs] = useState({});

  // ✅ LOAD DATA
  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

  // ================= BOOKINGS =================

  const fetchBookings = async () => {

    try {

      const res = await getAllBookings();

      console.log("BOOKINGS RESPONSE 👉", res.data);

      // ✅ HANDLE BOTH ARRAY + API RESPONSE
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setBookings(data);

    } catch (error) {

      console.error("Error fetching bookings:", error);
    }
  };

  // ================= DRIVERS =================

  const fetchDrivers = async () => {

    try {

      const res = await API.get("/admin/drivers");

      console.log("DRIVERS RESPONSE 👉", res.data);

      // ✅ HANDLE BOTH ARRAY + API RESPONSE
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setDrivers(data);

    } catch (err) {

      console.error("Fetch drivers error:", err);
    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {

    try {

      await updateBookingStatus(id, status);

      alert("Booking status updated ✅");

      fetchBookings();

    } catch (error) {

      console.error("Error updating status:", error);
    }
  };

  // ================= DELETE BOOKING =================

  const deleteBooking = async (id) => {

    try {

      await deleteBookingById(id);

      alert("Booking deleted ✅");

      fetchBookings();

    } catch (error) {

      console.error("Error deleting booking:", error);
    }
  };

  // ================= ASSIGN DRIVER =================

  const handleAssignDriver = async (bookingId) => {

    try {

      const input = driverInputs[bookingId] || {};

      let payload;

      // ✅ EXISTING DRIVER
      if (input.driverId) {

        payload = {
          driverId: input.driverId
        };
      }

      // ✅ NEW DRIVER
      else if (input.name && input.phone) {

        payload = {
          name: input.name,
          phone: input.phone
        };
      }

      else {

        alert("Select driver or enter driver details");

        return;
      }

      await assignDriver(bookingId, payload);

      alert("Driver assigned successfully ✅");

      fetchBookings();
      fetchDrivers();

    } catch (err) {

      console.error("Assign error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📦 Bookings Management</h1>

      <div style={styles.card}>
        <table style={styles.table}>

          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.cell}>ID</th>
              <th style={styles.cell}>User</th>
              <th style={styles.cell}>Pickup</th>
              <th style={styles.cell}>Drop</th>
              <th style={styles.cell}>Vehicle</th>
              <th style={styles.cell}>Driver</th>
              <th style={styles.cell}>Status</th>
              <th style={styles.cell}>Payment</th>
              <th style={styles.cell}>Method</th>
              <th style={styles.cell}>Actions</th>
              <th style={styles.cell}>Assign Driver</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={styles.row}>

                <td style={styles.cell}>{b.id}</td>
                <td style={styles.cell}>{b.userPhone || "User"}</td>
                <td style={styles.cell}>{b.pickupLocation}</td>
                <td style={styles.cell}>{b.dropLocation}</td>
                <td style={styles.cell}>{b.vehicleType}</td>

                <td style={styles.cell}>
                  {b.driverName ? (
                    <>
                      {b.driverName} <br />
                      📞 {b.driverPhone}
                    </>
                  ) : (
                    "Not Assigned"
                  )}
                </td>

                {/* STATUS */}
                <td style={styles.cell}>
                  <span style={{
                    ...styles.statusBadge,
                    ...styles[`status_${b.status}`]
                  }}>
                    {b.status}
                  </span>
                </td>

                {/* PAYMENT */}
                <td style={styles.cell}>
                  {b.paymentDone ? (
                    <span style={styles.paid}>✅ Paid</span>
                  ) : (
                    <span style={styles.unpaid}>❌ Pending</span>
                  )}
                </td>

                <td style={styles.cell}>
                  {b.paymentMethod || "-"}
                </td>

                {/* ACTIONS */}
                <td style={styles.cell}>
                  <select
                    style={styles.dropdown}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "DELETE") deleteBooking(b.id);
                      else updateStatus(b.id, val);
                    }}
                  >
                    <option value="">Action</option>
                    <option value="ACCEPTED">Accept</option>
                    <option value="STARTED">Start</option>
                    <option value="COMPLETED">Complete</option>
                    <option value="CANCELLED">Cancel</option>
                    <option value="DELETE">Delete</option>
                  </select>
                </td>

                  {/* DRIVER ASSIGN */}
                  <td style={styles.cell}>

  <div style={styles.driverBox}>

    {/* ✅ MAIN ACTION */}
    <select
      style={styles.input}
      value={driverInputs[b.id]?.mode || ""}
      onChange={(e) =>
        setDriverInputs({
          ...driverInputs,
          [b.id]: {
            ...driverInputs[b.id],
            mode: e.target.value
          }
        })
      }
    >
      <option value="">Action</option>
      <option value="existing">Select Existing Driver</option>
      <option value="new">Add New Driver</option>
    </select>

    {/* ================= EXISTING DRIVER ================= */}
    {driverInputs[b.id]?.mode === "existing" && (

      <>
        <select
          style={styles.input}
          value={driverInputs[b.id]?.driverId || ""}
          onChange={(e) =>
            setDriverInputs({
              ...driverInputs,
              [b.id]: {
                ...driverInputs[b.id],
                driverId: e.target.value
              }
            })
          }
        >
          <option value="">Select Driver</option>

          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.phone})
            </option>
          ))}
        </select>

        <button
          style={styles.assignBtn}
          onClick={() => handleAssignDriver(b.id)}
        >
          Assign
        </button>
      </>
    )}

    {/* ================= NEW DRIVER ================= */}
    {driverInputs[b.id]?.mode === "new" && (

      <>
        <input
          style={styles.input}
          placeholder="Driver Name"
          value={driverInputs[b.id]?.name || ""}
          onChange={(e) =>
            setDriverInputs({
              ...driverInputs,
              [b.id]: {
                ...driverInputs[b.id],
                name: e.target.value
              }
            })
          }
        />

        <input
          style={styles.input}
          placeholder="Driver Phone"
          value={driverInputs[b.id]?.phone || ""}
          onChange={(e) =>
            setDriverInputs({
              ...driverInputs,
              [b.id]: {
                ...driverInputs[b.id],
                phone: e.target.value
              }
            })
          }
        />

        <button
          style={styles.assignBtn}
          onClick={() => handleAssignDriver(b.id)}
        >
          Assign
        </button>
      </>
    )}

  </div>

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
    padding: 10,
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0f172a"
  },

  card: {
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: 20,
    width: "1100px",
    height: "600px",          // ✅ fixed height
    overflowY: "auto",
    boxSizing: "border-box"        // ✅ scroll ONLY body
  },

  table: {
  width: "100%",
  tableLayout: "fixed", // 🔥 VERY IMPORTANT
  borderCollapse: "collapse"
},

  tableHead: {
    position: "sticky",       // ✅ FIXED HEADER
    top: 0,
    background: "#0f172a",
    color: "#fff",
    zIndex: 2
  },

  cell: {
    padding: "15px 10px",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14
  },

  row: {
    transition: "0.2s"
  },

  actionCell: {
    padding: 10
  },
  paid: {
  color: "#16a34a",
  fontWeight: "bold"
},

unpaid: {
  color: "#dc2626",
  fontWeight: "bold"
},

  dropdown: {
    padding: 6,
    borderRadius: 6,
    border: "1px solid #ccc",
    cursor: "pointer"
  },

  // 🔥 STATUS BADGES
  statusBadge: {
    padding: "5px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    display: "inline-block"
  },

  statusRequested: { background: "#f59e0b" },
  statusAccepted: { background: "#3b82f6" },
  statusStarted: { background: "#22c55e" },
  statusCompleted: { background: "#16a34a" },
  statusCancelled: { background: "#ef4444" },

  status_PAID: { background: "#10b981" },
status_ACCEPTED: { background: "#3b82f6" },
status_STARTED: { background: "#22c55e" },
status_COMPLETED: { background: "#16a34a" },
status_CANCELLED: { background: "#ef4444" },

paid: {
  color: "#16a34a",
  fontWeight: "bold"
},

unpaid: {
  color: "#dc2626",
  fontWeight: "bold"
},

  // 🔥 DRIVER INPUT BOX
  driverBox: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  input: {
    padding: 6,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 13
  },

  assignBtn: {
    padding: 6,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13
  },
    thead: {
    position: "sticky",
    top: 0,
    background: "#0f172a",
    color: "#fff",
    zIndex: 1
  }
};

export default BookingsPage;