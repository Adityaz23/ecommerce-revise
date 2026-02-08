// Now, generating the AuthProvider for the context API. This will be used to provide the authentication state of the entire application.
import { createContext, useState } from "react";
export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  // Now creating the function to handle the login and the sign up functionality.
  function login(email, password) {
    // This will be used to login the user and set the user state to be logged in.
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // finding the user in the users array with same email and password.
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true, message: "User logged in successfully" };
  }
  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  function signup(email, password) {
    // This will be used to sign up the user and set the user state to be logged in.
    // Using local storage to store the user data.
    // getting the users from the local storage and adding the new user to the users array and then setting the users array back to the local.
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Now, checking if the user already exists in the users array with the same email
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already exists with this email" };
    }
    const newUsers = { email, password };
    users.push(newUsers);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true, message: "User signed up successfully" };
  }
  return (
    <AuthContext.Provider value={{ signup, user, logout ,login}}>
      {/* This will wrap all the props. */}
      {children}
    </AuthContext.Provider>
  );
}
