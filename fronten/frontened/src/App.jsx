import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentForm from "./components/StudentForm";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import "./App.css";


function App() {
  return (

  
    

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/student"
        element={
          localStorage.getItem("roll")
            ? <StudentForm />
            : <Navigate to="/login" />
        }
      />

      <Route path="/admin" element={<AdminLogin />} />

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
