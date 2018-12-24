//dependecies
const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const { Stylist } = require('../config/sequelize');

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.post('/api/stylists', async (req, res) => {
    try {
        console.log(req.body);
        const stylist = await Stylist.create(req.body);
        res.json(stylist);
    } catch (error) {
        res.json(error);
        console.log("Error: " + error);
    }
});

// // create a stylist
// app.post('/api/stylists', (req, res) => {
//     console.log(req.body);
//     Stylist.create(req.body)
//         .then(stylist => res.json(stylist))
//         .catch(err => console.log(err))
// });

// create a stylist
// app.post('/api/stylists', (req, res) => {
//     try {
//         console.log(req.body);
//         Stylist.create(req.body)
//             .then(stylist => res.json(stylist));
//     } catch (error) {
//         console.log("There are ");
//     }
// });

// // return true or false to validate existing stylist
// app.get('/api/stylists/isUnique:id?', (req, res) => {
//     Stylist.count({ 'id': req.param.id }).then(c => {
//         res.json(req.param.id);
//         console.log("There are " + c + " projects with an id greater than 25.");
//     })
//     // Stylist.findAll().then(users => res.json(users))
// });

// // return true or false to validate existing stylist
// app.get('/api/stylists/isUnique:id?', (req, res) => {
//     Stylist.count({ where: { 'id': req.param.id } }).then(c => {
//         res.json(req.param.id);
//         console.log("There are " + c + " projects with an id greater than 25.");
//     })
//     // Stylist.findAll().then(users => res.json(users))
// });

// get all users
app.get('/api/stylists', (req, res) => {
    Stylist.findAll().then(stylists => res.json(stylists))
})


const port = process.env.port || 3000;

//synching sequelize models and then starting our express app
app.listen(port, function () {
    console.log("Running on http://localhost:" + port);
});