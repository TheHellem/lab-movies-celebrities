const { application } = require("express");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect(`celebrities/${createdCelebrity._id}`);
    })
    .catch((err) => {
      res.redirect("celebrities/new-celebrity");
      next(err);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      console.log(celebritiesFromDB);
      res.render("celebrities/celebrities", { celebrities: celebritiesFromDB });
    })
    .catch((err) => next(err));
});

module.exports = router;
