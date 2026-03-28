import React, { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
  { name: "Mon", bookings: 10 },
  { name: "Tue", bookings: 20 },
  { name: "Wed", bookings: 15 },
  { name: "Thu", bookings: 30 },
  { name: "Fri", bookings: 25 },
  { name: "Sat", bookings: 40 },
  { name: "Sun", bookings: 35 }
];

  // 🔄 LOADING STATE
  if (!data) {
    return <h2 style={{ padding: 20 }}>Loading dashboard...</h2>;
  }

   const cards = [
  { title: "Total Bookings", value: data.totalBookings, icon: "📦", trend: "+12%" },
  { title: "Total Vehicles", value: data.totalVehicles, icon: "🚗", trend: "+5%" },
  { title: "Total Drivers", value: data.totalDrivers, icon: "🧑‍✈️", trend: "+8%" },
  { title: "Revenue", value: `₹ ${data.totalRevenue}`, icon: "💰", trend: "+18%" },

  { title: "Active Trips", value: 12, icon: "🟢", trend: "+3%" },
  { title: "Completed Trips", value: 85, icon: "✅", trend: "+10%" },
  { title: "Cancelled Trips", value: 4, icon: "❌", trend: "-2%" },
  { title: "Pending Requests", value: 7, icon: "⏳", trend: "+6%" },

  { title: "Top Vehicle", value: "SUV", icon: "🚙", trend: "Hot" },
  { title: "Top Driver", value: "Harish", icon: "🏆", trend: "Top" }
];

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.heading}>Dashboard</h1>
        <span style={styles.subtitle}>Overview of your system</span>
      </div>
      <div style={styles.topBanner}>
        <h2>Welcome back, Admin 👋</h2>
         <p>Track performance, manage rides, and grow your business 🚀</p>
        </div>

      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            
            <div
  key={index}
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
  }}
>

  <div style={styles.cardTop}>
    <span style={styles.icon}>{card.icon}</span>
    <span style={styles.title}>{card.title}</span>
  </div>

  <h2 style={styles.value}>{card.value}</h2>

  <p
    style={{
      ...styles.trend,
      color: card.trend.includes("-") ? "#ef4444" : "#22c55e"
    }}
  >
    {card.trend}
  </p>

</div>

            <h2 style={styles.value}>{card.value}</h2>

          </div>
        ))}
      </div>

      
        <div style={styles.chartCard}>
  <h3>📊 Weekly Bookings</h3>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="bookings"
        stroke="#2563eb"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
<div style={styles.quickActions}>
  <button>Add Driver</button>
  <button>Add Vehicle</button>
  <button>View Bookings</button>
</div>

<p style={{ color: "#6b7280", marginTop: "10px" }}>
  🚀 Growth is 18% higher this week. Keep scaling!
</p>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f8fafc",
    height: "100vh", 
    overflowY: "auto"
    
  },

  header: {
    marginBottom: "25px"
  },

  heading: {
    margin: 0,
    fontSize: "28px"
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "14px"
  },
  quickActions: {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
},

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  chartCard: {
  marginTop: "25px",
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  boxSizing: "border-box",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
},

card: {
  background: "#ffffff",
  padding: "18px",
  borderRadius: "14px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease",
  cursor: "pointer"
},

cardTop: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "10px"
},

icon: {
  fontSize: "20px"
},

title: {
  fontSize: "13px",
  color: "#6b7280"
},

value: {
  margin: "5px 0",
  fontSize: "24px",
  fontWeight: "bold"
},

trend: {
  fontSize: "12px",
  fontWeight: "600"
},
topBanner: {
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "#fff",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "20px"
},



  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px"
  },

  icon: {
    fontSize: "20px"
  },

  title: {
    fontSize: "14px",
    color: "#6b7280"
  },

  value: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "bold"
  }
};

export default DashboardPage;