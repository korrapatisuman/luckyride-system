import React, { useEffect, useState } from "react";

function UsersPage() {

  const [users, setUsers] = useState([]);

  // Temporary data (later fetch from backend API)
  useEffect(() => {

    const dummyUsers = [
      { id: 1, name: "Rahul", phone: "9876543210", status: "Active" },
      { id: 2, name: "Suresh", phone: "9876543211", status: "Active" },
      { id: 3, name: "Mahesh", phone: "9876543212", status: "Blocked" }
    ];

    setUsers(dummyUsers);

  }, []);

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const blockUser = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: "Blocked" } : user
    );
    setUsers(updatedUsers);
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>Users Management</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>

              <td>

                <button
                  style={styles.blockBtn}
                  onClick={() => blockUser(user.id)}
                >
                  Block
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteUser(user.id)}
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

  title: {
    marginBottom: "20px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  blockBtn: {
    marginRight: "10px",
    background: "orange",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  }

};

export default UsersPage;