const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postDbData) => res.json(postDbData))
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postDbData) => {
      if (!postDbData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      res.json(postDbData);
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_body: req.body.post_body,
    user_id: req.session.user_id,
  })
    .then((postDbData) => {
      res.json(postDbData);
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
