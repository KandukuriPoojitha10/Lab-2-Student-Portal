const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const SECRET = "studentportal_secret123";

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({
        id: Date.now().toString(),
        name,
        email,
        password: hashed,
        role: "student"
    });

    res.json({ message: "Registration successful" });
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
});

app.get("/api/auth/profile", (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);
        const user = users.find(u => u.id === decoded.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
});

app.get("/", (req, res) => {
    res.send("Student Portal Running Successfully");
});

app.listen(5000, () => {
    console.log("Student Portal Server Running on Port 5000");
});