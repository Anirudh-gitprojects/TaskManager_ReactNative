import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const API_URI = 'https://taskmanager-xcwt.onrender.com'

  // Store JWT in asynctorage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.error("Error storing token:", e);
    }
  };


  // Login User
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URI}/api/v1/auth/login`, { email, password });
      
      const token = response.data.token;
      console.log("Received Token:", token);
      
      await storeToken(token); // Store token in AsyncStorage
      authCtx.authenticate(token); // Authenticate user
    
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", error.response?.data?.message || "Invalid Login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
        style={styles.input}
      />
      
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
        style={styles.input}
      />

      <Button 
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
        loading={loading} 
        disabled={loading}
      >
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#bb86fc",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
  linkText: {
    color: "#bbb",
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "#bb86fc",
    fontWeight: "bold",
  },
});
