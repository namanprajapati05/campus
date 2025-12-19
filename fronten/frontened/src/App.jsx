import { Routes, Route, Navigate } from "react-router-dom";

// Student pages
import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentForm from "./components/StudentForm";

// Admin pages
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Routes>

      {/* ================= STUDENT ROUTES ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student protected route */}
      <Route
        path="/student"
        element={
          localStorage.getItem("roll")
            ? <StudentForm />
            : <Navigate to="/" />
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Admin protected route */}
      <Route
        path="/admin/panel"
        element={
          localStorage.getItem("admin")
            ? <AdminPanel />
            : <Navigate to="/admin" />
        }
      />

    </Routes>
  );
}

export default App;
