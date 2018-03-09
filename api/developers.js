const express = require('express');

const router = express.Router();
//  Import queries
const queries = require('../db/queries');

//middleware
function isValidId(req, res, next) {
    //  If id isn't NaN(if it's a number) continue doing
    if(!isNaN(req.params.id)) return next();
    //  else return error
    next(new Error('Invalid ID'));
}

router.get('/', (req, res) => {
    queries.getAll()
        //  Execute getAll function in db/queries
            .then(developers => {
                //  Respond with result
                 res.json(developers);
            });
});

//  everytime this request is called,if isValidId return true it will continue working,else
//  it will show error
router.get('/:id', isValidId, (req, res) => {
    res.json({
        message: 'Hello'
    })
});

//  Export router so it can be used outside this folder
module.exports = router;