const express = require('express');
const app = express(); 
require("dotenv").config();
const bodyParser = require("body-parser");
const cookie=require('cookie-parser');
const cors = require("cors");
const pg = require("pg")
const { Pool } = pg
const port = 3000;

const session = require("express-session");

app.use(session({
    secret: 'HelloWorld',
    resave:false,
    saveUninitialized:false
}));

app.use(cookie());
app.set('view engine', 'ejs');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`it is alive on http.localhost:${port}`));

const unitsPool = require('./routes/unitsPool');
const usersPool = require('./routes/usersPool');
const postRoutes = require('./routes/postRoutes');
const stripe = require('./routes/stripe');

app.use("/unitsPool", unitsPool);
app.use("/usersPool", usersPool);
app.use("/api", postRoutes);
app.use("/api/stripe", stripe);
