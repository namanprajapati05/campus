import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.roll) {
      localStorage.setItem("roll", data.roll);
      navigate("/student");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="box">
      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>

      {/* 🔥 SIGNUP LINK */}
      <p>
        New student? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
};

export default Login;
