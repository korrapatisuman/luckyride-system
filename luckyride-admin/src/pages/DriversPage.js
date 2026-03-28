import React, { useState, useEffect } from "react";
import {
  getAllDrivers,
  createDriver,
  deleteDriverById
} from "../services/api";

function DriversPage() {

  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
  try {
    const res = await getAllDrivers();

    console.log("DRIVERS API RESPONSE 👉", res.data); // 👈 ADD THIS

    setDrivers(res.data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

  // ➕ ADD DRIVER
  const addDriver = async () => {
    if (!name || !phone) {
      alert("Fill all fields");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter valid 10-digit phone");
      return;
    }

    try {
      await createDriver({ name, phone });
      fetchDrivers();
      setName("");
      setPhone("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ❌ DELETE DRIVER
  const deleteDriver = async (id) => {
    try {
      await deleteDriverById(id);
      fetchDrivers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Driver Management</h1>

      {/* FORM */}
      <div style={styles.card}>
        <div style={styles.form}>

          <input
            style={styles.input}
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button style={styles.addBtn} onClick={addDriver}>
            + Add Driver
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div style={styles.card}>

        <table style={styles.table}>

          <thead style={styles.thead}>
            <tr>
              <th style={styles.headerCell}>ID</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Phone</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>

          <tbody>

            {drivers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                  No drivers found 🚗
                </td>
              </tr>
            ) : (
              drivers.map((d) => (

                <tr key={d.id} style={styles.row}>
                  <td style={styles.cell}>{d.id}</td>
                  <td style={styles.cell}>{d.name}</td>
                  <td style={styles.cell}>{d.phone}</td>

                  <td style={styles.cell}>
                    <div style={{ position: "relative" }}>

                      {/* MENU BUTTON */}
                      <button
                        style={styles.menuBtn}
                        onClick={() =>
                          setOpenMenu(openMenu === d.id ? null : d.id)
                        }
                      >
                        ⋮
                      </button>

                      {/* DROPDOWN */}
                      {openMenu === d.id && (
                        <div style={styles.dropdown}>

                          <button
                            style={styles.dropdownItem}
                            onClick={() => {
                              alert("Edit feature next 🚀");
                              setOpenMenu(null);
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            style={styles.dropdownItemDelete}
                            onClick={() => {
                              deleteDriver(d.id);
                              setOpenMenu(null);
                            }}
                          >
                            🗑 Delete
                          </button>

                        </div>
                      )}

                    </div>
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

// 🎨 STYLES
const styles = {

  container: {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  addBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  thead: {
  position: "sticky",
  top: 0,
  background: "#0f172a",
  color: "#fff",
  zIndex: 1
},

  headerCell: {
    padding: "10px",
    textAlign: "left"
  },

  row: {
    borderBottom: "1px solid #eee"
  },

  cell: {
    padding: "10px"
  },

  // 🔥 DROPDOWN
  menuBtn: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer"
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "25px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
    minWidth: "120px",
    zIndex: 100
  },

  dropdownItem: {
    width: "100%",
    padding: "10px",
    border: "none",
    background: "white",
    textAlign: "left",
    cursor: "pointer"
  },

  dropdownItemDelete: {
    width: "100%",
    padding: "10px",
    border: "none",
    background: "white",
    color: "red",
    textAlign: "left",
    cursor: "pointer"
  }

};

export default DriversPage;