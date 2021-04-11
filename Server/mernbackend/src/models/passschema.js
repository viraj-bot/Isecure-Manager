const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    websites: [String],
    passwords: [String]
})
const passwordScehma = new mongoose.model("passwords", schema);
module.exports = passwordScehma;