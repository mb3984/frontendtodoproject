import React, { useState } from "react";
import axios from "axios";
import "./TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://backendtodoproject.onrender.com/tasks",
        { title, description, status },
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 201) {
        alert("Task created successfully!");
        // Clear form fields after success
        setTitle("");
        setDescription("");
        setStatus("pending");
      }
    } catch (error) {
      alert(
        "Failed to create task: " + (error.response?.data || "Unknown error")
      );
      console.error("Failed to create task", error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
