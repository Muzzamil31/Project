// src/App.js
import React, { useState, useEffect } from "react";
//react router for navigation
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import WorkList from "./components/WorkList";
import Login from "./components/Login";
import Register from "./components/Register";


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  //  Add new employee
  const handleAdd = async (newTask) => {
    const formData = new FormData();
    Object.entries(newTask).forEach(([key, value]) => formData.append(key, value));

    const res = await fetch("http://localhost:5000/api/employees", {
      method: "POST",
      body: formData,
    });

    const savedTask = await res.json();
    setTasks((prev) => [...prev, savedTask]);
  };
  // delete employee
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  //update employee
  const handleUpdate = async (updatedTask) => {
    const formData = new FormData();
    Object.entries(updatedTask).forEach(([key, value]) => formData.append(key, value));

    const res = await fetch(`http://localhost:5000/api/employees/${updatedTask.id}`, {
      method: "PUT",
      body: formData,
    });

    const saved = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
    setEditingTask(null);
  };

  return (
    <div>
      <AddTask onAdd={handleAdd} />
      <WorkList
        tasks={tasks}
        onEdit={(id) => setEditingTask(tasks.find((t) => t.id === id))}
        onDelete={handleDelete}
      />
      {editingTask && (
        <UpdateTask
          selectedTask={editingTask}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

//  Private Route Wrapper
//protects dashboard from unauthenticated access
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* redirect route to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
