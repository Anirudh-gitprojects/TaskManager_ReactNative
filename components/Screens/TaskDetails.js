import React, { useContext, useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import axios from "axios";
import { TasksContext } from "../Context/TaskContext";
import { AuthContext } from "../Context/AuthContext";

export default function TaskDetailsScreen({ route, navigation }) {
  const { task } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    title: task.title,
    description: task.description,
  });

  const API_URI = 'https://taskmanager-xcwt.onrender.com'

  const authCtx = useContext(AuthContext);
  const {deleteTask} = useContext(TasksContext)
  const config = {
    headers: { Authorization: `Bearer ${authCtx.token}` },
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URI}/api/v1/tasks/${task.id}`, config);
    deleteTask(task.id)
    navigation.goBack();
  };

  const handleUpdate = async () => {
    await axios.put(`${API_URI}/api/v1/tasks/${task.id}`, updateTask, config);
    setIsModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Task Details Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.updateButton} onPress={() => setIsModalVisible(true)}>
          Update Task
        </Button>
        <Button mode="contained" style={styles.deleteButton} onPress={handleDelete}>
          Delete Task
        </Button>
      </View>

      {/* Update Task Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Task</Text>

            {/* Title Input */}
            <TextInput
              label="Title"
              value={updateTask.title}
              onChangeText={(text) => setUpdateTask({ ...updateTask, title: text })}
              style={styles.input}
              textColor="white"
              mode="outlined"
              theme={{
                colors: {
                  primary: "#1e90ff",
                  text: "#fff", 
                  placeholder: "#bbb",
                  background: "#333",
                },
              }}
            />

            {/* Description Input */}
            <TextInput
              label="Description"
              value={updateTask.description}
              onChangeText={(text) => setUpdateTask({ ...updateTask, description: text })}
              style={styles.input}
              textColor="white"
              mode="outlined"
              multiline
              theme={{
                colors: {
                  primary: "#1e90ff",
                  text: "#fff",
                  placeholder: "#bbb",
                  background: "#333",
                },
              }}
            />

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <Button mode="contained" style={styles.saveButton} onPress={handleUpdate}>
                Save Changes
              </Button>
              <Button mode="contained" style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    padding: 20,
  },
  card: {
    backgroundColor: "#1e1e1e", // Darker card background
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: "#1e90ff",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    flex: 1,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)", // Semi-transparent background
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#333",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#1e90ff",

    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#555",
    flex: 1,
    marginLeft: 10,
  },
});


