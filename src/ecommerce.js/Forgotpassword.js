import React, { useState, useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [existingUsers, setExistingUsers] = useState([]); // Optional: To show existing users or similar data

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Fetch existing user data or other necessary configurations when the component mounts
  useEffect(() => {
    const fetchExistingUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin_console/users/");
        if (!response.ok) {
          throw new Error("Failed to fetch existing users.");
        }
        const data = await response.json();
        setExistingUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchExistingUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset the message

    if (!validateEmail(email)) {
      setMessage("Invalid email format. Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/admin_console/forgotpassword/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link. Please try again.");
      }

      const data = await response.json();
      setMessage("Password reset link sent successfully to your email!");
      console.log("Response:", data);
    } catch (error) {
      setMessage(error.message || "An error occurred!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Forgot Password</h3>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Reset Link
            </button>
          </form>
          {message && (
            <div
              className={`alert mt-3 ${
                message.includes("successfully") ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
          {existingUsers.length > 0 && (
            <div className="mt-3">
              <h5>Existing Users:</h5>
              <ul>
                {existingUsers.map((user) => (
                  <li key={user.id}>{user.email}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
