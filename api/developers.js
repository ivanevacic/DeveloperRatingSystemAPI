const express = require('express');

const router = exporess.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'It works'
    })
});

//  Export router so it can be used outside this folder
module.exports = router;