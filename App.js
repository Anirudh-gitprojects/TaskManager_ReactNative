import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AppNavigator from "./components/Screens/AppNavigator";
import AuthContextProvider from './components/Context/AuthContext';
import { TasksProvider } from './components/Context/TaskContext';
const App = () => {
  return (
    <AuthContextProvider>
      <TasksProvider>
    <AppNavigator/>
    </TasksProvider>
  </AuthContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})