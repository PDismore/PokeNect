const router = require('express').Router();
const { User, Post, Comment } = require("../../models");

router.get('/', (res, req) => {
    Comment.findAll()
        .then(commentDbData => res.json(commentDbData))
        .catch(err => {
            console.log(err),
                res.status(500).json(err)
        })
})

router.get('/:id', (res, req) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'post_body', 'user_id'],
                include: {
                    module: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(commentDbData => res.json(commentDbData))
        .catch(err => {
            console.log(err),
                res.status(500).json(err)
        })
})

router.post('/', (res, req) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentDbData => res.json(commentDbData))
        .catch(err => {
            console.log(err),
                res.status(500).json(err)
        })
})


router.delete('/:id', (res, req) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No comment found with this id' });
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