import React, { useState, useEffect } from "react";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [existingUsers, setExistingUsers] = useState([]);

    // Fetch existing user data on component mount
    useEffect(() => {
        const fetchExistingUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/admin_console/users/");
                if (!response.ok) {
                    throw new Error(`Failed to fetch existing users. Status: ${response.status}`);
                }
                const users = await response.json();
                setExistingUsers(users);
            } catch (error) {
                console.error("Error fetching existing users:", error.message);
            }
        };

        fetchExistingUsers();
    }, []); // Empty dependency array ensures it runs only on mount

    const validateInputs = () => {
        if (!/^[a-zA-Z]{1,50}$/.test(firstname)) {
            return "First name must contain only alphabetic characters and be at most 50 characters long.";
        }
        if (!/^[a-zA-Z]{1,50}$/.test(lastname)) {
            return "Last name must contain only alphabetic characters and be at most 50 characters long.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 50) {
            return "Email must be in a valid format and at most 50 characters long.";
        }
        if (!/^\d{10}$/.test(mobilenumber)) {
            return "Mobile number must be exactly 10 digits.";
        }
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
            return "Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.";
        }
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const validationError = validateInputs();
        if (validationError) {
            setMessage(validationError);
            return;
        }

        const data = {
            firstname,
            lastname,
            email,
            mobilenumber,
            password,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/admin_console/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Registration failed! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setMessage("Registration successful!");
            console.log("Response:", responseData);
        } catch (error) {
            setMessage(error.message || "An error occurred!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3 className="text-center mb-4">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                placeholder="Enter your first name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                placeholder="Enter your last name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobilenumber"
                                placeholder="Enter your mobile number"
                                value={mobilenumber}
                                onChange={(e) => setMobilenumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                    {message && (
                        <div className={`alert mt-3 ${message.includes("successful") ? "alert-success" : "alert-danger"}`} role="alert">
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

export default Register;
