import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
    const [page, setPage] = useState("register");
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setPage("login");
    };

    return (
        <div className="container">
            {loggedIn ? (
                <Dashboard logout={logout} />
            ) : page === "register" ? (
                <Register onLogin={() => setPage("login")} />
            ) : (
                <Login onLogin={() => setLoggedIn(true)} />
            )}

            {!loggedIn && (
                <button className="switch"
                    onClick={() => setPage(
                        page === "register" ? "login" : "register"
                    )}>
                    {page === "register" ? "Go to Login" : "Create Account"}
                </button>
            )}
        </div>
    );
}

export default App;