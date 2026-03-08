const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ------------ MYSQL CONNECTION -------------
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",   // <<< CHANGE THIS TO YOUR REAL PASSWORD !!!
    database: "billing_system"
});

db.connect(err => {
    if (err) {
        console.log("MySQL Error:", err);
    } else {
        console.log("MySQL Connected!");
    }
});

// ------------ SERVE FRONTEND ---------------
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ------------ LOGIN API --------------------
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    // Inbuilt username + password
    if (username === "admin" && password === "admin123") {
        return res.json({ success: true });
    }

    res.json({ success: false, message: "Invalid username or password" });
});

// ------------ START SERVER ------------------
app.listen(3000, () => console.log("Server running on http://localhost:3000"));