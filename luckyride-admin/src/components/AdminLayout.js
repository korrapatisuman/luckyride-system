import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  return (

    <div style={styles.container}>
      <Navbar />

      <div style={styles.body}>
       <Sidebar />

       <div style={styles.content}>
        <Outlet />
    </div>
  </div>
</div>

  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden" // 🚨 STOP PAGE SCROLL
  },

  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden"
  },

  content: {
    flex: 1,
    overflowY: "auto", // ✅ ONLY CONTENT SCROLLS
    padding: "20px",
    background: "#f8fafc"
  }
};

