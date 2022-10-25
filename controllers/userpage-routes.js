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
        attributes: [
          "post_body",
          "post_title",
          "createdAt"
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
    ],
  })
  .then((userDbData) => {
      // console.log(userDbData)
      if (!userDbData) {
        res.status(404).json({ message: "post not found" });
        return;
      }
      const user = userDbData.get({ plain: true });
      console.log(user)
      res.render("userpage", { user, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err), res.status(500).json(err);
    });
});


module.exports = router;
