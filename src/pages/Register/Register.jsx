import { useState } from "react";
import "./register.css";
import { registerUser } from "../../rudux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Validate input
        if (!email || !username || !password) {
            setError("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        const usernameRegex = /^[A-Za-z]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username must only contain letters (no numbers or special characters).");
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a special character.");
            return;
        }

        if (username.length < 3 ) {
            setError("Username must be at least 3 characters long.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Clear error and register user
        setError("");
        const newUser = {
            email: email,
            password: password,
            username: username,
        };
        registerUser(newUser, dispatch, navigate);
    };

    return (
        <div className="wrapper-register">


<section className="register-container">
            <div className="register-title">Sign up</div>
            <form onSubmit={handleRegister}>
                <label>EMAIL</label>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>USERNAME</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>PASSWORD</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Create account</button>
            </form>
            
        </section>
        </div>
       
    );
};

export default Register;
