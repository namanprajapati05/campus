import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await fetch("http://localhost:5000/admin/complaints");
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const closeComplaint = async (id) => {
    await fetch(`http://localhost:5000/admin/close/${id}`, {
      method: "PUT"
    });
    fetchComplaints();
  };

  // 🔥 FILTERING
  const pending = complaints.filter(c => c.status === "Pending");
  const closed = complaints.filter(c => c.status === "Closed");

  return (
    <div className="admin-box">

      <h2>Pending Complaints</h2>

      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Department</th>
            <th>Problem</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pending.map(c => (
            <tr key={c._id}>
              <td>{c.roll}</td>
              <td>{c.department}</td>
              <td>{c.problem}</td>
              <td>
                <button
                  className="close-btn"
                  onClick={() => closeComplaint(c._id)}
                >
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br /><br />

      <h2>Solved / Closed Complaints</h2>

      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Department</th>
            <th>Problem</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {closed.map(c => (
            <tr key={c._id}>
              <td>{c.roll}</td>
              <td>{c.department}</td>
              <td>{c.problem}</td>
              <td style={{ color: "green" }}>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminPanel;
