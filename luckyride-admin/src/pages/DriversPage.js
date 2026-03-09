import React, { useState, useEffect } from "react";

function DriversPage() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {

    const dummyDrivers = [
      {
        id: 1,
        name: "Ramesh",
        phone: "9876543210",
        vehicle: "Auto",
        status: "Active"
      },
      {
        id: 2,
        name: "Suresh",
        phone: "9123456780",
        vehicle: "Car",
        status: "Inactive"
      },
      {
        id: 3,
        name: "Mahesh",
        phone: "9988776655",
        vehicle: "Traveller",
        status: "Active"
      }
    ];

    setDrivers(dummyDrivers);

  }, []);

  const updateStatus = (id, newStatus) => {

    const updated = drivers.map((driver) => {
      if (driver.id === id) {
        return { ...driver, status: newStatus };
      }
      return driver;
    });

    setDrivers(updated);

  };

  const deleteDriver = (id) => {

    const updated = drivers.filter((driver) => driver.id !== id);
    setDrivers(updated);

  };

  return (

    <div style={styles.container}>

      <h1>Drivers Management</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {drivers.map((driver) => (

            <tr key={driver.id}>

              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.vehicle}</td>

              <td>

                <select
                  value={driver.status}
                  onChange={(e) =>
                    updateStatus(driver.id, e.target.value)
                  }
                >

                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>

                </select>

              </td>

              <td>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteDriver(driver.id)}
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

export default DriversPage;