//dependecies
const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const { Stylist, Saloon } = require('../config/sequelize');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// create a stylist
app.post('/api/stylists', async (req, res) => {
    try {
        console.log(req.body);
        const stylist = await Stylist.create(req.body);
        res.json({
            success: true,
            stylist: stylist
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.errors[0].message
        });
        console.log("Error: " + error);
    }
});

// create a saloon owner
app.post('/api/saloon', async (req, res) => {
    try {
        const saloon = await Saloon.create(req.body);
        res.json({
            success: true,
            saloon: saloon
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.errors[0].message
        });
        console.log("Error: " + error);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const saloon = await Saloon.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        res.json({
            // success: true,
            // result: saloon[0].id,
            saloon: saloon
        });
    } catch (error) {
        res.json({
            // success: false,
            // result: saloon[0].id,
            saloon: saloon,
            error: error.errors[0].message
        });
    }
});

//get the id of the saloon owner
// app.post('/api/login', (req, res) => {
//     Saloon.findAll({
//         where: {
//             email: req.body.email,
//             password: req.body.password
//         }
//     }).then(
//         Saloon => res.json(Saloon)
//     )
// });


// get all saloon owners
app.get('/api/saloon', (req, res) => {
    // console.log("hi " + req.params.password);
    Saloon.findAll().then(Saloon => res.json(Saloon))
})


const port = process.env.port || 3000;

//synching sequelize models and then starting our express app
app.listen(port, function () {
    console.log("Running on http://localhost:" + port);
});