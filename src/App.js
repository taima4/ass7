import { Button, TextField } from "@mui/material";
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
//add
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };
//check
  const toggleTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
//edit
  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };
//delete
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container" style={{ textAlign: "center", paddingTop: "20px", backgroundColor: "#F0F1F6", minHeight: "100vh" }}>
      <h1>
        <span className="second-title">
          <span style={{ color: "#6972A3" }}>Todo</span> List App
        </span>
      </h1>
      <form onSubmit={addTask}>
        <TextField
          fullWidth
          label="Add new task"
          id="fullWidth"
          className="add-task"
          type="text"
          style={{ width: "500px" }}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          className="add-button"
          style={{ marginLeft: "10px", width: "5%", height: "50px", backgroundColor: "#5A688C" }}
        >
          Add
        </Button>
      </form>

      <div className="todo-list" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
       
        {tasks.map((task, index) => (
          <div className="todo" style={{ display: "flex", justifyContent:"space-around" ,width:"70%" }} key={index}>
            <input
              className="checkbox"
              type="checkbox"
              id={`isCompleted-${index}`}
              checked={task.completed}
              onChange={() => toggleTaskComplete(index)}
            />
            <div className="todo-text" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </div>
            <div className="todo-actions">
              <button
                className="submit-edits"
                style={{ marginRight: "20px", backgroundColor: "#5A688C", borderRadius: "10px", padding: "10px", color: "white" }}
                onClick={() => {
                  const newText = prompt("Edit task:", task.text);
                  if (newText !== null) {
                    editTask(index, newText);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="submit-edits"
                style={{ borderRadius: "10px", padding: "10px", backgroundColor: "#747577", color: "white" }}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default App;
