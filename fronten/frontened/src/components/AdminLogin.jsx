import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Admin login successful") {
          localStorage.setItem("admin", "true"); 
          navigate("/admin/panel");
        } else {
          setMsg(data.message);
        }
      });
  };

  return (
    <div className="box">
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p>{msg}</p>
    </div>
  );
};

export default AdminLogin;
