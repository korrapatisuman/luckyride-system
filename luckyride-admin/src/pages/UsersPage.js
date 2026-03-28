import React, { useEffect, useState } from "react";
import API from "../services/api";

function UsersPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Customers</h1>

      {loading ? (
        <p style={styles.loading}>Loading users...</p>
      ) : (
        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Created At</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.noData}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} style={styles.row}>

                    <td>
                      {user.firstName || "-"} {user.lastName || ""}
                    </td>

                    <td>{user.phone || "-"}</td>

                    <td>{user.email || "-"}</td>

                    <td>
                      <span
                        style={{
                          ...styles.status,
                          background:
                            user.status === "ACTIVE"
                              ? "#16a34a"
                              : "#dc2626"
                        }}
                      >
                        {user.status || "N/A"}
                      </span>
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    fontFamily: "sans-serif"
  },

  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold"
  },

  loading: {
    textAlign: "center",
    fontSize: "18px"
  },

  tableWrapper: {
    maxHeight: "500px",   // ✅ SCROLL ENABLED
    overflowY: "auto",
    border: "1px solid #eee",
    borderRadius: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#f3f4f6",
    padding: "12px",
    textAlign: "left",
    position: "sticky",
    top: 0
  },

  row: {
    borderBottom: "1px solid #eee"
  },

  noData: {
    textAlign: "center",
    padding: "20px"
  }, 

  thead: {
  position: "sticky",
  top: 0,
  background: "#0f172a",
  color: "#fff",
  zIndex: 1
},

  status: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px"
  }

};

export default UsersPage;