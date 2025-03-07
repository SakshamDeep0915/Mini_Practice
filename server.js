const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res.status(400).json({error: "All fields are required"});
    }
    const newEntry = { name, email, message };

    fs.readFile("messages.json", (err, data) => {
        let messages = [];
        if (!err) {
            messages = JSON.parse(data);
        }
        messages.push(newEntry);
        fs.writeFile("messages.json", JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).json({error: "Failed to save message"});
            }
            res.json({success: "Message saved successfully!" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});