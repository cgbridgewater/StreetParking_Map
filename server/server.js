const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const PORT = 8000;

require('dotenv').config();

app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config.js');
require('./routes/user.routes')(app);

app.listen(PORT,() => {
    console.log(`Charging up the Swaggin Wagon on Port: ${PORT}!`)
});