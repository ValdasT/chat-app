const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post('/get-answer', (req, res, next) => {
    console.log(req.body.message);
    let data = {
        "question": req.body.message,
        "token": 'nGKHwSH89Q4qMjMK',
        "user": 'Ieva' + " " + 'Merzvinskaite',
        "email": 'Ieva.Merzvinskaite@lt.ibm.com',
        "channel": 'web_' + 'hugo',
        "system": 'hugo',
        "channelList": [
            { name: 'cog', value: true },
            { name: 'contracts', value: true },
            { name: 'dca', value: true },
            { name: 'eme', value: true },
            { name: 'gbscrm', value: true },
            { name: 'ibmway', value: true },
            { name: 'ibp', value: true },
            { name: 'ippf', value: true },
            { name: 'phd', value: true },
            { name: 'pmcoe', value: true },
            { name: 'prom', value: true },
            { name: 'score', value: true },
            { name: 'rcm', value: true }
        ],
        region: 'EUROPE'
    }
    axios({
        method: 'POST',
        url: process.env.HUGO_API,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${process.env.HUGO_PASS}`
        },
        data: data,
    }).then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
    }).catch(err => {
        console.log(err);
        return next(err);
    });
});

module.exports = router;