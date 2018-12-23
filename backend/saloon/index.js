//dependecies
const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const { Stylist } = require('./sequelize');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// create a user
app.post('/api/stylists', (req, res) => {
    console.log(req.body);
    Stylist.create(req.body)
        .then(stylist => res.json(stylist));
});


const port = process.env.port || 3000;

//synching sequelize models and then starting our express app
app.listen(port, function () {
    console.log("Running on http://localhost:" + port);
});