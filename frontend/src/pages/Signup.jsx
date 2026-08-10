import "../auth.css";
import { useState } from "react";
import API from "../services/api";

function Signup() {


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/signup", formData);

            alert("Account created successfully!");
            console.log(response.data);
            
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1>HireSense</h1>
                <h2>Create Account</h2>

                <p>
                    Create your HireSense account to save resume analyses and track your career growth.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="auth-link">
                    Already have an account? <a href="/login">Login</a>
                </p>

            </div>
        </div>
    );
}

export default Signup;