import React, { useState } from "react";

const Login = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = () => {
    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.roll) {
          // ✅ save roll only after successful login
          localStorage.setItem("roll", data.roll);

          setMsg("Login successful");
          setPage("student"); // open problem page
        } else {
          setMsg(data.message || "Invalid login");
        }
      })
      .catch(() => setMsg("Server error"));
  };

  return (
    <div className="box">
      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
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

      <p
        className="link"
        onClick={() => setPage("signup")}
      >
        New student? Signup
      </p>
    </div>
  );
};

export default Login;
