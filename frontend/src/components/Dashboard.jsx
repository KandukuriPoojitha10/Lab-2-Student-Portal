import React, { useEffect, useState } from "react";

function Dashboard({ logout }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/profile", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => setUser(data))
        .catch(() => logout());
    }, []);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="dashboard">
            <h1>Student Portal</h1>
            <h2>Welcome, {user.name}!</h2>

            <div className="cards">
                <div className="card">👤<h3>Personal Profile</h3>
                    <p>{user.email}</p>
                </div>

                <div className="card">📚<h3>Course Materials</h3>
                    <p>Access your study materials</p>
                </div>

                <div className="card">📊<h3>Academic Reports</h3>
                    <p>View your academic progress</p>
                </div>
            </div>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;