const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Routes/Route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", route);

mongoose.connect("mongodb://localhost:27017/App2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
