import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", bookings: 40 },
  { name: "Feb", bookings: 60 },
  { name: "Mar", bookings: 90 },
  { name: "Apr", bookings: 70 },
  { name: "May", bookings: 110 }
];

function DashboardPage() {
  return (
    <div style={{ padding: "20px"}}>
      <h2>Admin Dashboard</h2>

      {/* Statistics Cards */}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <h1>120</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Drivers</h3>
          <h1>25</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Vehicles</h3>
          <h1>18</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Bookings</h3>
          <h1>340</h1>
        </div>
      </div>

      {/* Chart */}

      <div style={{ marginTop: "20px", width: "100%", height: 200 }}>
        <h3>Monthly Bookings</h3>

        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center"
};

export default DashboardPage;