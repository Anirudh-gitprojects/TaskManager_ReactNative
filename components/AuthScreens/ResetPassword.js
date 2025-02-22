import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {

    const { email } = route.params;
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URI = 'https://taskmanager-xcwt.onrender.com'
    
    // 
    const handleResetPassword = async () => {
        if (!otp || !newPassword) {
            Alert.alert('Error', 'Please enter all fields.');
            return;
        }
        
        setLoading(true); // Start loading

        try {
            const response = await axios.put(`${API_URI}/api/v1/auth/resetPassword`, { email, otp, newPassword });
            
            if (response.data.success) {
                Alert.alert('Success', 'Password reset successful!');
                navigation.navigate('Login'); // Redirect to login screen
            } else {
                Alert.alert('Error', response.data.message || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Your Password</Text>
            <Text style={styles.subtitle}>An email has been sent with an OTP code. Please enter it below.</Text>

            <TextInput
                label="OTP Code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                mode="outlined"
                theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
                style={styles.input}
            />

            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                mode="outlined"
                theme={{ colors: { primary: "#fff", placeholder: "#bbb", text: "#fff" } }}
                style={styles.input}
            />

            <Button 
                mode="contained" 
                onPress={handleResetPassword} 
                loading={loading} 
                disabled={loading}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Reset Password
            </Button>
        </View>
    );
};

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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#bbb",
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
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#121212",
    },
});

export default ResetPasswordScreen;
