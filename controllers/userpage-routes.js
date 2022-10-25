const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/:id", (req, res) => {
  Post.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: [
          "username",
          "profile_pic",
          "about_me",
          "fav_pokemon",
          "fav_game",
        ],
      },
    ],
  })
    .then((postDbData) => {
      const posts = postDbData.map((post) => post.get({ plain: true }));
      res.render("userpage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

module.exports = router;
