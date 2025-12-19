import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/")}>CampusApp</h3>

      <span className="navButton" onClick={() => navigate("/")}>
        <h5>Home</h5>
      </span>
    </div>
  );
};

export default Navbar;
