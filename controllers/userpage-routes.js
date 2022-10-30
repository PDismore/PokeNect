const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");
const Follower = require("../models/Follower");

router.get("/:id", async function (req, res) {
  const userDbData = await User.findOne({
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
  });
  const following = await Follower.findOne({
    where: {
      follower_id: req.session.user_id,
      followed_id: req.params.id
    }
  });
  let myProfile = true;
  if (req.session.user_id === parseInt(req.params.id)) {
    myProfile = true
  } else {
    myProfile = false
  }
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
    myProfile,
    following
  });
})
  // .catch((err) => {
  //   console.log(err), res.status(500).json(err);
  // });


module.exports = router;
