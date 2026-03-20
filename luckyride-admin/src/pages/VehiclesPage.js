import React, { useState, useEffect } from "react";
import {
  getVehicles,
  addVehicleAPI,
  deleteVehicleAPI
} from "../services/api";

function VehiclesPage() {

  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [seats, setSeats] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 🔥 FETCH VEHICLES
  const fetchVehicles = async () => {
    try {
      const res = await getVehicles();
      console.log("ADMIN VEHICLES:", res.data);
      setVehicles(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ➕ ADD VEHICLE
  const addVehicle = async () => {
    if (!name || !type || !seats) {
      alert("Fill all fields");
      return;
    }

    try {
      await addVehicleAPI({
        vehicleName: name,
        vehicleType: type,
        seatingCapacity: Number(seats),
        pricePerKm: 20, // default price (you can improve later)
        imageUrl: null
      });

      fetchVehicles();

      // clear form
      setName("");
      setType("");
      setSeats("");

    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ❌ DELETE VEHICLE
  const deleteVehicle = async (id) => {
    try {
      await deleteVehicleAPI(id);
      fetchVehicles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Vehicle Management</h1>

      {/* FORM */}
      <div style={styles.card}>
        <div style={styles.form}>

          <input
            style={styles.input}
            placeholder="Vehicle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            style={styles.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Auto">Auto</option>
            <option value="Car">Car</option>
            <option value="Traveller">Traveller</option>
          </select>

          <input
            style={styles.input}
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />

          <button style={styles.addBtn} onClick={addVehicle}>
            + Add Vehicle
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
              <th style={styles.headerCell}>Type</th>
              <th style={styles.headerCell}>Seats</th>
              <th style={styles.headerCell}>Price/KM</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>

          <tbody>

            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No vehicles found 🚗
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (

                <tr key={v.id} style={styles.row}>
                  <td style={styles.cell}>{v.id}</td>
                  <td style={styles.cell}>{v.vehicleName}</td>
                  <td style={styles.cell}>{v.vehicleType}</td>
                  <td style={styles.cell}>{v.seatingCapacity}</td>
                  <td style={styles.cell}>₹{v.pricePerKm}</td>

                 <td style={styles.cell}>
  <div style={{ position: "relative" }}>
    
    {/* MENU BUTTON */}
    <button
      style={styles.menuBtn}
      onClick={() =>
        setOpenMenu(openMenu === v.id ? null : v.id)
      }
    >
      ⋮
    </button>

    {/* DROPDOWN */}
    {openMenu === v.id && (
      <div style={styles.dropdown}>
        
        <button
          style={styles.dropdownItem}
          onClick={() => {
            alert("Edit " + v.id);
            setOpenMenu(null);
          }}
        >
          ✏️ Edit
        </button>

        <button
          style={styles.dropdownItemDelete}
          onClick={() => {
            deleteVehicle(v.id);
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
    background: "#f8fafc"
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
  cursor: "pointer",
  transition: "0.2s"
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

export default VehiclesPage;