// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((celebritiesFromDB) => {
    res.render("movies/new-movie", { celebrities: celebritiesFromDB });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      console.log(createdMovie);
      res.redirect("/movies");
    })
    .catch((err) => {
      res.redirect("/movies");
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((err) => next(err));
});



router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movie-details", {movie : moviesFromDB});
    })
    .catch(err => next(err))
});


router.get("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/movies")
  })
  .catch(err => next(err))
})



module.exports = router;
