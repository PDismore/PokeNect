const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  })
    .then((postDbData) => {
      const posts = postDbData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
        sessionId: req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("/");
    return;
  }
  res.render("loginpage");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "createdAt"],
        include: {
          model: User,
          attributes: ["username", "id"],
        },
      },
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  })
    .then((postDbData) => {
      if (!postDbData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      const post = postDbData.get({ plain: true });
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        sessionId: req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

module.exports = router;
