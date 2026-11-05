import React, { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                onLogin();
            } else {
                alert(data.message);
            }
        } catch {
            alert("Server connection failed");
        }
    };

    return (
        <div className="auth-box">
            <h2>Student Login</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"
                    required onChange={e => setEmail(e.target.value)} />

                <input type="password" placeholder="Password"
                    required onChange={e => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;