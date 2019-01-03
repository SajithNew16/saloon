//dependecies
const sequelize = require("../config/sequelize");
var Sequelize = require("sequelize");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { Stylist, Saloon, User, Event } = require("../config/sequelize");
const Op = Sequelize.Op;
const app = express();
app.use(cors());
app.use(bodyparser.json());

// create a user
app.post("/api/user", (req, res) => {
  User.create(req.body)
    .then(user =>
      res.json({
        success: true,
        user: user
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err.errors
      })
    );
});

//retrieve user id by email
app.get("/api/user/:email?", (req, res) => {
  User.findOne({
    where: {
      email: req.params.email
    },
    attributes: ["userId"]
  })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// create a saloon owner
app.post("/api/saloon", (req, res) => {
  Saloon.create(req.body)
    .then(saloon =>
      res.json({
        success: true,
        saloon: saloon
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err.errors
      })
    );
});

// create a stylist
app.post("/api/stylist", (req, res) => {
  Stylist.create(req.body)
    .then(stylist =>
      res.json({
        success: true,
        stylist: stylist
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err.errors
      })
    );
});

//check for the availability when logging
app.post("/api/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user =>
      res.json({
        success: true,
        user: user
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err.errors
      })
    );
});

//retrieve stylist data
app.get("/api/stylist/:userId", (req, res) => {
  Stylist.findOne({
    where: {
      userId: req.params.userId
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//retrieve saloon data
app.get("/api/saloon/:userId", (req, res) => {
  Saloon.findOne({
    where: {
      userId: req.params.userId
    }
  }).then(saloon =>
    res.json({
      saloon: saloon
    })
  );
});

//update stylist profie
app.put("/api/stylist/:userId", (req, res, err) => {
  Stylist.update(
    {
      userName: req.body.userName,
      email: req.body.email
    },
    {
      where: {
        userId: req.params.userId
      }
    }
  )
    .then(function(rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch(err);
});

// search all stylists by name
app.get("/api/stylistByName/:userName", (req, res) => {
  // console.log("hi " + req.params.userName);
  Stylist.findAll({
    where: {
      userName: {
        $like: "%" + req.params.userName + "%"
      }
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//search stylist by charges rate
app.get("/api/stylistByChrge/:chargesMan", (req, res) => {
  // console.log("hi " + req.params.chargesMan);
  Stylist.findAll({
    where: {
      chargesMan: {
        $like: "%" + req.params.chargesMan + "%"
      }
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//remove user account by email
app.delete("/api/userByEmail/:email", (req, res) => {
  User.destroy({
    where: {
      email: req.params.email
    }
  }).then(user =>
    res.json({
      user: user
    })
  );
});

//remove stylist account by id
app.delete("/api/stylistById/:styId", (req, res) => {
  Stylist.destroy({
    where: {
      styId: req.params.styId
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//search stylist by starting free time slot
app.get("/api/stylistByStartSlot/:startValue", (req, res) => {
  Stylist.findAll({
    where: {
      startValue: {
        [Op.gte]: req.params.startValue
      }
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//search stylist by ending free time slot
app.get("/api/stylistByEndSlot/:endValue", (req, res) => {
  Stylist.findAll({
    where: {
      endValue: {
        [Op.lte]: req.params.endValue
      }
    }
  }).then(stylist =>
    res.json({
      stylist: stylist
    })
  );
});

//update stylist acceptance with request
app.put("/api/stylistAcceptance/:userId", (req, res, err) => {
  Stylist.update(
    {
      acceptance: req.body.acceptance
    },
    {
      where: {
        userId: req.params.userId
      }
    }
  )
    .then(function(rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch(err);
});

// app.put("/api/stylistUpdate/:userId", (req, res) => {
//   sequelize
//     .query(
//       `UPDATE stylists
//     SET startValue = '2015-03-16 23:34:04'
//     WHERE userId = 13`,
//       { type: Sequelize.QueryTypes.UPDATE }
//     )
//     .then(function(rowsUpdated) {
//       res.json(rowsUpdated);
//     });
// });

//update stylist profie
app.put("/api/stylistUpdate/:userId", (req, res, err) => {
  console.log("jiefeferfergergege " + "2016-08-09 04:05:02");
  Stylist.update(
    {
      startValue: "2016-08-09 04:05:02",
      endValue: req.body.endValue
    },
    {
      where: {
        userId: req.params.userId
      }
    }
  )
    .then(function(rowsUpdated) {
      res.json(rowsUpdated);
      console.log("jiefeferfergergege " + rowsUpdated);
    })
    .catch(err);
});

// create an event
app.post("/api/event", (req, res) => {
  Event.create(req.body)
    .then(event =>
      res.json({
        success: true,
        event: event
      })
    )
    .catch(err =>
      res.json({
        success: false,
        err: err.errors
      })
    );
});

// //remove saloon owner account by id
// app.delete('/api/saloonByEmail/:email', (req, res) => {
//     Saloon.destroy({
//         where: {
//             email: req.params.email
//         }
//     }).then((saloon) => res.json({
//         saloon: saloon
//     }));
// })

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
app.get("/api/saloon", (req, res) => {
  // console.log("hi " + req.params.password);
  Saloon.findAll().then(Saloon => res.json(Saloon));
});

const port = process.env.port || 3000;

//synching sequelize models and then starting our express app
app.listen(port, function() {
  console.log("Running on http://localhost:" + port);
});
