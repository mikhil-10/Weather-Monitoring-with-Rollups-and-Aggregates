const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    main: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    temp_min: { type: Number, required: true },
    temp_max: { type: Number, required: true },
    humidity: { type: Number, required: true },
    speed: { type: Number, required: true },
    dt: { type: Number, required: true },
    day: { type: String },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model("currentWeather", schema);