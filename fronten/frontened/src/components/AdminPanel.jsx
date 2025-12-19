import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  // 🔐 Protect admin page
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin"); // admin login page
    }
  }, [navigate]);

  // fetch complaints
  useEffect(() => {
    fetch("http://localhost:5000/admin/complaints")
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, []);

  const closeComplaint = (id) => {
    fetch(`http://localhost:5000/admin/close/${id}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => {
        setComplaints(prev =>
          prev.map(c =>
            c._id === id ? { ...c, status: "Closed" } : c
          )
        );
      });
  };

  return (
    <div className="admin">
      <h2>Admin Complaint Panel</h2>

      <button
        onClick={() => {
          localStorage.removeItem("admin");
          navigate("/admin");
        }}
      >
        Logout
      </button>

      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Department</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map(c => (
            <tr key={c._id}>
              <td>{c.roll}</td>
              <td>{c.department}</td>
              <td>{c.problem}</td>
              <td>{c.status}</td>
              <td>
                {c.status === "Pending" ? (
                  <button onClick={() => closeComplaint(c._id)}>
                    Close
                  </button>
                ) : (
                  "Closed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
