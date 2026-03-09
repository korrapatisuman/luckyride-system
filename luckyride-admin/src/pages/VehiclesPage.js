import React, { useState, useEffect } from "react";

function VehiclesPage() {

  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [seats, setSeats] = useState("");

  useEffect(() => {

    const dummyVehicles = [
      { id: 1, name: "Auto 1", type: "Auto", seats: 3 },
      { id: 2, name: "Traveller 1", type: "Traveller", seats: 12 },
      { id: 3, name: "Car 1", type: "Car", seats: 5 },
      { id: 4, name: "Car 2", type: "Car", seats: 10 }
    ];

    setVehicles(dummyVehicles);

  }, []);

  const addVehicle = () => {

    if (!name || !type || !seats) {
      alert("Please fill all fields");
      return;
    }

    const newVehicle = {
      id: vehicles.length + 1,
      name,
      type,
      seats
    };

    setVehicles([...vehicles, newVehicle]);

    setName("");
    setType("");
    setSeats("");
  };

  const deleteVehicle = (id) => {
    const updated = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updated);
  };

  return (

    <div style={styles.container}>

      <h1>Vehicle Management</h1>

      {/* Add Vehicle Form */}

      <div style={styles.form}>

        <input
          placeholder="Vehicle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Auto">Auto</option>
          <option value="Car">Car</option>
          <option value="Traveller">Traveller</option>
        </select>

        <input
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <button onClick={addVehicle}>Add Vehicle</button>

      </div>

      {/* Vehicle Table */}

      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {vehicles.map((vehicle) => (

            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.seats}</td>

              <td>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteVehicle(vehicle.id)}
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

  form: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px"
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

export default VehiclesPage;