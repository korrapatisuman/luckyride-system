import React, { useEffect, useState } from "react";
import API from "../services/api";

function UsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/bookings");

      // 🔥 EXTRACT UNIQUE USERS FROM BOOKINGS
      const uniqueUsers = [];

      res.data.forEach(b => {
        if (!uniqueUsers.find(u => u.phone === b.userPhone)) {
          uniqueUsers.push({
            phone: b.userPhone,
            totalBookings: 1
          });
        } else {
          const user = uniqueUsers.find(u => u.phone === b.userPhone);
          user.totalBookings++;
        }
      });

      setUsers(uniqueUsers);

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>Customers</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Phone</th>
            <th>Total Bookings</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (

              <tr key={index}>
                <td>{user.phone}</td>
                <td>{user.totalBookings}</td>
              </tr>

            ))
          )}

        </tbody>

      </table>

    </div>

  );
}

const styles = {
  container: { padding: "40px" },
  title: { marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" }
};

export default UsersPage;