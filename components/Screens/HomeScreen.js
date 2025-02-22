import React, { useCallback, useContext, useEffect } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Card, Text, FAB } from "react-native-paper";
import { TasksContext } from "../Context/TaskContext";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { tasks, refreshing, fetchTasks } = useContext(TasksContext);
  useFocusEffect(
    useCallback(()=>{
      fetchTasks();
    },[]))
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("TaskDetails", { task: item })}
          >
            <Card.Content>
              <Text style={styles.taskTitle}>{item.title}</Text>
            </Card.Content>
          </Card>
        )}
      />

      {/* Floating Action Button */}
      <FAB 
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  card: {
    backgroundColor: "#1e1e1e",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  taskTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#1e90ff",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    margin: 10,
  },
});
