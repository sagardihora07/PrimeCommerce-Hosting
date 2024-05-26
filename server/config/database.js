const mongoose = require("mongoose")
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_URL)
    .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error) =>{
        console.log("DB CONNECTION FAILED");
        console.log(error);
        process.exit(1);
    } )
}