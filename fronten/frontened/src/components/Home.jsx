import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="overlay">
        <h1>Campus Problem Reporting System</h1>
        <p>
          A platform for students to report campus-related issues easily
          and get them resolved by the administration.
        </p>

        <div className="btn-group">
          <button onClick={() => navigate("/login")}>
            Student Login
          </button>

          <button className="admin-btn" onClick={() => navigate("/admin")}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
