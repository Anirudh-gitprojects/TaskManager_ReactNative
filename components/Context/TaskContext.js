import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const authCtx = useContext(AuthContext)
  
  const API_URI = 'https://taskmanager-xcwt.onrender.com'

  const config = {
    headers: { Authorization: `Bearer ${authCtx.token}` },
  };
  const fetchTasks = async () => {
    if(authCtx.isAuthenticated){
    try {
      setRefreshing(true);
      const response = await axios.get(`${API_URI}/api/v1/tasks`,config);
      setTasks(response.data.task); // Ensure you are correctly setting the response data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setRefreshing(false);
    }}
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the provider loads
  }, []);

  // Function to add a task and trigger a re-render
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks,newTask]); // Ensure a new reference
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, addTask,deleteTask, refreshing, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
