import { useState, useEffect } from "react";
import { useApp } from "./context/AppContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Interview from "./pages/InterviewPage.jsx";
import "./App.css";

function Dashboard() {
  const [search, setSearch] = useState("");
  const { applyJob } = useApp();
  const [apiJobs, setApiJobs] = useState([]);

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setApiJobs(data));
}, []);

  const jobs = [
    { id: 1, company: "TCS", role: "Software Developer", location: "Chennai" },
    { id: 2, company: "Infosys", role: "Frontend Developer", location: "Bangalore" },
    { id: 3, company: "Wipro", role: "Graduate Engineer", location: "Chennai" },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>🎓 Student Placement Dashboard</h1>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/interview">Interviews</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <div className="stats">
        <div>📋 Applications<br /><b>5</b></div>
        <div>📅 Interviews<br /><b>2</b></div>
        <div>✅ Selected<br /><b>1</b></div>
        <div>🔔 Notifications<br /><b>3</b></div>
      </div>

      <h2>Job Opportunities</h2>

      <input
        placeholder="Search company or job..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="jobs">
        {filteredJobs.map((job) => (
          <div className="card" key={job.id}>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
            <p>📍 {job.location}</p>
            <button onClick={() => applyJob(job)}>Apply Now</button>
          </div>
        ))}
      </div>
      <h2>Company Updates</h2>

<div className="jobs">
  {apiJobs.slice(0, 3).map((item) => (
    <div className="card" key={item.id}>
      <h3>{item.company.name}</h3>
      <p>{item.email}</p>
    </div>
  ))}
</div>
    </>
  );
}

function Applications() {
  const { applications } = useApp();

  return (
    <>
      <h1>📋 Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="jobs">
          {applications.map((job, index) => (
            <div className="card" key={index}>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
              <p>📍 {job.location}</p>
              <p>✅ Applied</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Profile() {
  const [name, setName] = useState("Student");
  const [department, setDepartment] = useState("ECE");
  const [email, setEmail] = useState("student@test.com");

  function saveProfile(e) {
    e.preventDefault();
    alert("Profile updated successfully!");
  }

  return (
    <div className="form">
      <h1>👤 Student Profile</h1>

      <form onSubmit={saveProfile}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;