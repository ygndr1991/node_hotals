const mongoose = require("mongoose");
// define mongodb url
const mongoUrl = 'mongodb://localhost:27017/hotal';

// set up mongodb connect
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;


// define event listeners for database connection..........
db.on('connected', () => {
    console.log("Database is Connected")
})

db.on('disconnected', () => {
    console.log("Datbase is not connected")
})

db.on('error', (err) => {
    console.log("Error in database connection", err)
})

module.exports = db;
