const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://nhatphong:nhatphong@cluster0.zpucf.mongodb.net/test?authSource=admin&replicaSet=atlas-zgepk0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Error:" + error);
    }
}

module.exports = { connect };