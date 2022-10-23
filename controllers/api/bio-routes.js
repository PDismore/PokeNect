const router = require('express').Router();
const { User, Bio } = require("../../models");

router.get('/', (req, res) => {
    Bio.findAll()
    .then(bioDbData => res.json(bioDbData))
    .catch(err => {
        console.log(err),
            res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
    Bio.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(bioDbData => res.json(bioDbData))
    .catch(err => {
        console.log(err),
            res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Bio.create({
        about_me: req.body.about_me,
        user_id: req.body.user_id
    })
    .then(bioDbData => res.json(bioDbData))
    .catch(err => {
        console.log(err),
            res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
    Bio.update(req.body, {
        where: {
            user_id: req.body.user_id
        }
    })
    .then(bioDbData => {
        if(!bioDbData) {
            res.status(404).json({ message: 'No bio found for this user' });
                return;
        }
        res.json(bioDbData)
    })
    .catch(err => {
        console.log(err),
            res.status(500).json(err)
    })
})

module.exports = router;