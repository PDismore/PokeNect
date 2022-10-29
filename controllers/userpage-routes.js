const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        separate: true,
        attributes: ["post_body", "post_title", "createdAt", "id"],
        order: [
          ['created_at', 'DESC']
        ],
        include: {
          model: User,
          attributes: ["username", "id"],
        },
      },
    ],
  })
  .then((userDbData) => {
    let myProfile = true;
      if (req.session.user_id === parseInt(req.params.id)) {
        myProfile = true
      } else {
        myProfile = false
      }

    return {
      myProfile,
      userDbData
    }
  })
    .then(({userDbData, myProfile}) => {
      if (!userDbData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      const user = userDbData.get({ plain: true });
      res.render("userpage", {
        user,
        loggedIn: req.session.loggedIn,
        sessionId: req.session.user_id,
        sessionUsername: req.session.username,
        myProfile
      });
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});

module.exports = router;
