import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                HireSense
            </div>

            <div className="navbar-links">

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/history")}
                >
                    Resume History
                </button>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;