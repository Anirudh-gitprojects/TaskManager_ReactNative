import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from "react-native-paper";
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    
    const API_URI = 'https://taskmanager-xcwt.onrender.com'
    
    // Send otp for password reset
    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        setLoading(true); // Start loading

        try {
            await axios.post(`${API_URI}/api/v1/auth/forgotPassword`, { email });

            navigation.navigate('ResetPassword', { email });
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your email</Text>
        
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
            />
            
            <Button
                mode="contained"
                onPress={handleForgotPassword}
                style={styles.button}
                labelStyle={styles.buttonText}
                disabled={loading} // Disable button while loading
            >
                {loading ? <ActivityIndicator color="#fff" size="small" /> : "Next"}
            </Button>
        </View>
    );
};

export default ForgotPasswordScreen;

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
    button: {
        backgroundColor: "#bb86fc",
        borderRadius: 8,
        paddingVertical: 8,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#121212",
    },
});
