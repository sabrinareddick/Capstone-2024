const express = require('express');
const app = express(); 
require("dotenv").config();
const bodyParser = require("body-parser");
// const path = require("path");
const cors = require("cors");
const compression = require("compression");
// const fileUpload = require("express-fileupload");
const session = require("express-session")
const pg = require("pg")
const { Pool } = pg
const port = 3000;

app.listen(port, () => console.log(`it is alive on http.localhost:${port}`))

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const unitsPool = require('./routes/unitsPool')
const usersPool = require('./routes/usersPool')
const postRoutes = require('./routes/postRoutes')

app.use("/unitsPool", unitsPool)
app.use("/usersPool", usersPool)
app.use("/api", postRoutes)


