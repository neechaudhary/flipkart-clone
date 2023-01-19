require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const connectDB = async () =>{
 try {
    mongoose.connect(process.env.DB);
    console.log("MONGODB Database connected");
 } catch (error) {
    console.log("MONGODB Database not connected");
 }
}
module.exports = connectDB;