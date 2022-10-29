const router = require("express").Router();
const { User, Post } = require("../../models");

router.get("/", (req, res) => {
  //COME BACK AND EXCLUDE PASSWORD IN RESPONSE
  User.findAll()
    .then((userDbData) => res.json(userDbData))
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.get("/:username", (req, res) => {
  User.findOne({
    include: [
      {
        model: Post,
        attributes: ["id", "post_body", "created_at"],
      },
    ],
    where: {
      username: req.params.username,
    },
  })
    .then((userDbData) => {
      if (!userDbData) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      res.json(userDbData);
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((userDbData) => {
      res.json(userDbData);
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Username or password is incorrect." });
      return;
    }

    const validPassword = dbUserData.verifyPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Username or password is incorrect." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
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
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
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
