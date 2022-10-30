const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");
const Follower = require("../models/Follower")
const { Op } = require("sequelize");

router.get('/', (req, res) => {
    Follower.findAll({
        where: {
            follower_id: req.session.user_id
        }
    })
        .then(resultData => resultData.map(res => res.followed_id))
        // .then(testdata => console.log(testdata))
        // const foundFollowers = firstSeach.map(res => res.followed_id)
        .then(mappedData => Post.findAll({
            where: {
                user_id: {
                    [Op.in]: mappedData
                }
            },
            order: [
                ['createdAt', 'DESC']
              ],
            include: {
                model: User,
                attributes: ['username']
            }
        }))
        .then((followDbData) => {
            const posts = followDbData.map((post) => post.get({ plain: true }));
            res.render("feed", {
                posts,
                loggedIn: req.session.loggedIn,
                sessionId: req.session.user_id,
                sessionUsername: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

module.exports = router;