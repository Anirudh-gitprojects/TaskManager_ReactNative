📲 Task Management App (React Native + Expo)

A React Native app using Expo that allows users to sign up, log in, and manage tasks (CRUD operations) with JWT-based authentication.
📌 Features
Authentication

    Signup Screen
        Users can register with name, email, and password.
    Login Screen
        Users can log in using email and password.
        Token-based authentication using AsyncStorage to store JWT.

Task Management

    Home Screen
        Fetch and display tasks from the backend.
        Implement pull-to-refresh.
    Add Task Screen
        Allow users to create a task (title + description).
    Task Details Screen
        Display task details.
        Allow users to edit or delete tasks.

Logout

    Provides a logout button that clears the stored token and navigates to the Login screen.

🚀 Tech Stack & Tools

    State Management: Context API (or Redux Toolkit)
    Navigation: React Navigation (Stack Navigator)
    Storage: AsyncStorage (JWT Token Storage)
    UI: React Native Paper (for styling)
    API Calls: Axios (for interacting with the backend)

🛠 Setup Instructions
1️⃣ Clone the Repository

git clone https://github.com/your-username/react-native-tasks-app.git
cd react-native-tasks-app

2️⃣ Install Dependencies

npm install

3️⃣ Start the Development Server

npx expo start

4️⃣ Update API Base URL

    Open services/api.js and set the backend URL:

    export const API_BASE_URL = "http://your-backend-url.com"; // Replace with actual backend URL

5️⃣ Run the App

    Scan the QR code in Expo Go (for physical devices).
    Use i for iOS (Mac only) or a for Android in the terminal.
