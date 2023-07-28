const mongoose = require('mongoose');


        mongoose.connect("mongodb://127.0.0.1:27017/user");
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("db is connected")
        })  

module.exports = db;