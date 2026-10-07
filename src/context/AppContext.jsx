import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [student, setStudent] = useState({
    name: "Student",
    department: "ECE",
    email: "student@test.com",
  });

  const [applications, setApplications] = useState([]);

  function applyJob(job) {
    setApplications((old) => [...old, job]);
    alert("Application submitted successfully!");
  }

  return (
    <AppContext.Provider
      value={{ student, setStudent, applications, applyJob }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}