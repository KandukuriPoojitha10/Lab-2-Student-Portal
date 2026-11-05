import React, { useState } from "react";

function Register({ onLogin }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) onLogin();
        } catch {
            alert("Server connection failed");
        }
    };

    return (
        <div className="auth-box">
            <h2>Student Registration</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Full Name" required
                    onChange={e => setForm({...form, name: e.target.value})} />

                <input type="email" placeholder="Email" required
                    onChange={e => setForm({...form, email: e.target.value})} />

                <input type="password" placeholder="Password" required
                    onChange={e => setForm({...form, password: e.target.value})} />

                <button type="submit">Register</button>
            </form>

            <p>Already registered?
                <span onClick={onLogin}> Login</span>
            </p>
        </div>
    );
}

export default Register;