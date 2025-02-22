import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity,ActivityIndicator } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false)
  const authCtx = useContext(AuthContext)
  const API_URI = 'https://taskmanager-xcwt.onrender.com'
  const handleSignup = async () => {
    try {
      if(!name || !email || !password){
        alert('Please fill all fields!')
        return;
      }
      setLoading(true)
      const response = await axios.post(`${API_URI}/api/v1/auth/signup`, { name, email, password });
   
      authCtx.authenticate(response.data.token)
    } catch (error) {
      alert('Invalid Entry, please check all fields.')
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
        style={styles.input}
      />
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
        onPress={handleSignup}
        style={styles.button}
        labelStyle={styles.buttonText}
        disabled={loading}
        loading={loading}
      >
        Sign Up
      </Button>

      {/* Link to Login Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.link}>Log in</Text></Text>
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


