const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('../libs/controllers/users.controller')

router.post('/create-user', async (req, res, next) => {
    const userData = req.body.user;
    try {
        let user = await createUser(userData)
        if (user) res.status(200).send(user);
    } catch (err) {
        if (err) return next(err);
    }
});

router.post('/get-user', async (req, res, next) => {
    const userData = req.body.user;
    try {
        let user = await getUser(userData)
        if (user) res.status(200).send(user);
    } catch (err) {
        if (err) return next(err);
    }
});


module.exports = router;