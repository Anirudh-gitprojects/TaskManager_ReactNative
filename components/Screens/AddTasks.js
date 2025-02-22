import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { TasksContext } from "../Context/TaskContext";
export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authCtx = useContext(AuthContext);
  const { addTask } = useContext(TasksContext);
  const API_URI = 'https://taskmanager-xcwt.onrender.com'
  const handleAddTask = async () => {
    const config = {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    };
  
    try {
      const response = await axios.post(
        `${API_URI}/api/v1/tasks`,
        { title, description },
        config
      );
  
      const newTask = response.data.task; // Ensure you extract the correct task data
  
      addTask(newTask); // Update state immediately
    
      navigation.goBack();

     
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Task</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        textColor="white"
        style={styles.input}
        theme={{ colors: { text: "#fff", background: "#333", placeholder: "#bbb", primary: "#1e90ff" } }}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        textColor="white"
        numberOfLines={4}
        style={styles.input}
        theme={{ colors: { text: "#fff", background: "#333", placeholder: "#bbb", primary: "#1e90ff" } }}
      />
      <Button mode="contained" style={styles.button} onPress={handleAddTask}>
        Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    padding: 16,
    justifyContent: "center",
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#333", // Dark input background
    color: "#fff", // White text
  },
  button: {
    backgroundColor: "#1e90ff", // Blue button
    paddingVertical: 8,
  },
});
