import React, { useState } from "react";

const Signup = ({ setPage }) => {
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const signup = () => {
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, email, password })
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.message);
        if (data.message === "Signup successful") {
          setPage("login");
        }
      });
  };

  return (
    <div className="box">
      <h2>Student Signup</h2>

      <input placeholder="Roll Number" onChange={e => setRoll(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={signup}>Signup</button>
      <p>{msg}</p>

      <p onClick={() => setPage("login")} className="link">
        Already have account? Login
      </p>
    </div>
  );
};

export default Signup;
