import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LoginScreen from "../AuthScreens/Login";
import SignupScreen from "../AuthScreens/Signup";
import HomeScreen from "../Screens/HomeScreen";
import AddTaskScreen from "../Screens/AddTasks";
import TaskDetailsScreen from "../Screens/TaskDetails";
import { AuthContext } from "../Context/AuthContext";
import ForgotPasswordScreen from "../AuthScreens/ForgotPassword";
import ResetPasswordScreen from "../AuthScreens/ResetPassword";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const authCtx = useContext(AuthContext);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("userToken"); // Clear token
      authCtx.logout(); // Ensure AuthContext has a logout function
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  const logout = () => {
    Alert.alert("LOGOUT", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: clearData,
      },
    ]);
  };

  return (
    <NavigationContainer theme={NavigationDarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1E1E1E" }, // Dark header
          headerTitleStyle: { color: "#FFF" }, // White title
          headerTintColor: "#BA83DE", // Highlight color for back button
          cardStyle: { backgroundColor: "#121212" }, // Dark background for screens
        }}
      >
        {authCtx.isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                headerRight: () => (
                  <View style={{ marginRight: 10 }}>
                    <MaterialIcons
                      onPress={logout}
                      name="logout"
                      size={24}
                      color={"#FFF"} // White for visibility
                    />
                  </View>
                ),
              }}
            />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
