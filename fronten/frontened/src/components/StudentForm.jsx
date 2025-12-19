import React, { useEffect, useState } from "react";

const StudentForm = () => {
  const [roll, setRoll] = useState("");
  const [department, setDepartment] = useState("");
  const [problem, setProblem] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const savedRoll = localStorage.getItem("roll");
    if (savedRoll) setRoll(savedRoll);
  }, []);

  const submitComplaint = () => {
    if (!department || !problem) {
      setMsg("Please fill all fields");
      return;
    }

    fetch("http://localhost:5000/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, department, problem })
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.message);
        setDepartment("");
        setProblem("");
      });
  };

  return (
    <div className="box">
      <h2>Campus Problem Reporting</h2>

      <input value={roll} readOnly />

     <select value={department} onChange={e => setDepartment(e.target.value)}>
  <option value="">Select Problem Department</option>
  <option>Hostel</option>
  <option>Library</option>
  <option>Electrical</option>
  <option>Water Supply</option>
  <option>Cleaning / Housekeeping</option>
  <option>Internet / Wi-Fi</option>
  <option>IT Support</option>
  <option>Classroom / Furniture</option>
  <option>Security</option>
  <option>Other</option>
</select>


      <textarea
        placeholder="Describe the problem"
        value={problem}
        onChange={e => setProblem(e.target.value)}
      />

      <button onClick={submitComplaint}>Submit Complaint</button>
      <p>{msg}</p>
    </div>
  );
};

export default StudentForm;
