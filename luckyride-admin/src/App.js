import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="admin-layout">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="main-area">

          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="page-content">
            <AppRoutes />
          </div>

        </div>

      </div>
    </Router>
  );
}

export default App;