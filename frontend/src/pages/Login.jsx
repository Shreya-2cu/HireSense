import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/login", formData);;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1>HireSense</h1>
                <h2>Welcome Back</h2>

                <p className="auth-link">
                    Sign in to continue analyzing resumes and tracking your career growth.
                </p>

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="auth-btn">
                        Login
                    </button>

                </form>

                <p >
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>

            </div>
        </div>
    );
}

export default Login;