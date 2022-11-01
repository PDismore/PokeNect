const router = require('express').Router();
const { Post, User, } = require('../../models');
const Follower = require('../../models/Follower')
const { Op } = require("sequelize");


router.get('/', (req, res) => {
    Follower.findAll({})
    .then(dbFollowData => res.json(dbFollowData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
})

router.get('/followPost', (req, res) => {
    Follower.findAll({
        where: {
            follower_id: req.body.follower_id
        }
    })
    .then(resultData => resultData.map(res => res.followed_id))
    .then(mappedData => Post.findAll({
        where: {
            user_id: {
                [Op.in]: mappedData
            }
        }
    }))
    .then(dbFollowsData => res.json(dbFollowsData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
})

router.put('/', (req, res) => {
    // pass session id along with all destructured properties on reqbody
    User.follow({ ...req.body, follower_id: req.session.user_id }, { Follower, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  
});

router.delete('/', (req, res) => {
    Follower.destroy({
        where: {
            follower_id: req.session.user_id,
            followed_id: req.body.followed_id
        }
    })
    .then(dbFollowData => {
        if (!dbFollowData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbFollowData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;

