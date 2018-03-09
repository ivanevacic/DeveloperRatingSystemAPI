const express = require('express');

const router = express.Router();
//  Import queries
const queries = require('../db/queries');

router.get('/', (req, res) => {
    queries.getAll()
        //  Execute getAll function in db/queries
            .then(developers => {
                //  Respond with result
                 res.json(developers);
            })
});

//  Export router so it can be used outside this folder
module.exports = router;