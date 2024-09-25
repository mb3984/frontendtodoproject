import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://backendtodoproject.onrender.com/tasks",
          {
            headers: { Authorization: token },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://backendtodoproject.onrender.com/tasks/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setTasks(tasks.filter((task) => task.id !== id)); // Remove task from local state
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task", error.response.data);
      alert("Failed to delete task.");
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <Link to={`/updatetask/${task.id}`}>Update</Link>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
