const router = require('express').Router();
const { User, Post, Bio } = require("../../models");

router.get('/', (req, res) => {
    //COME BACK AND EXCLUDE PASSWORD IN RESPONSE
    User.findAll()
        .then(userDbData => res.json(userDbData))
        .catch(err => {
            console.log(err),
                res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    User.findOne({
        include: [
            {
                model: Post,
                attributes: ['id', 'post_body', 'created_at']
            },
            {
                model: Bio,
                attributes: ['id', 'about_me', 'profile_pic', 'fav_pokemon', 'fav_game']
            }
        ],
        where: {
            id: req.params.id
        }
    })
        .then(userDbData => {
            if (!userDbData) {
                res.status(404).json({ message: 'user not found' })
                return
            }
            res.json(userDbData)
        })
        .catch(err => {
            console.log(err),
                res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userDbData => {
        res.json(userDbData)
    })
    .catch(err => {
        console.log(err),
            res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
     
})

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;