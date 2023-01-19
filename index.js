const express= require("express");
const app = express();
// //for parsing data-> body-parser is better than express.json()
// const bodyparser= require("body-parser");
require('dotenv').config();

//mongodb connection
const connectDB = require("./config/connection");
connectDB();

//json to parse data
app.use(express.json());

// //for parsing data-> body-parser is better than express.json()
// app.use(bodyparser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/admin/auth"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});