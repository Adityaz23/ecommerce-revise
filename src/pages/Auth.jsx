import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
//   keeping the track of the errors if the user exists with the same email then show that error.
const [error,setError] = useState(null);
  const { signup, user, logout, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   creating a function to handle the login and sign up form submission.
  function onSubmit(data) {
    let result;
    signup(data.email, data.password);
    // now checking if the mode is login or signup and calling the respective function from the context API.
    if (mode === "login") {
      result = login(data.email, data.password);
    } else {
      result = signup(data.email, data.password);
    }
    if(result.success){
        alert("hello");
    }
    else{
        setError(result.error)
    }
    console.log(result);
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in: {user.email}</p>}
          {/* Temporary logout button :- */}
          <button onClick={logout}>Logout</button>
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Checking if there are errors in the form action. */}
            {error && <div className="error-message">{error}</div>}
            {/* Now the form will have 2 required fields email and password field. */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email: "
                id="email"
                className="form-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password: "
                className="form-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          {/* Now, creating the switcher for the user to switch between the login and signup page. */}
          <div className="auth-switch ">
            {mode === "signup" ? (
              <p>
                Account already exists?{" "}
                <span
                  className="auth-link"
                  onClick={() => {
                    setMode("login");
                  }}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                {" "}
                Don't have an account ?{" "}
                <span
                  className="auth-link"
                  onClick={() => {
                    setMode("signup");
                  }}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
