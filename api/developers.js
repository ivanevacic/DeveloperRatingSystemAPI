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

function validDeveloper(developer) {
    //  Check if a full name is a string and isn't  empty
    const hasFirstName = typeof developer.full_name == 'string' && developer.full_name.trim() != '';
    //  Check if a position is a string and isn't  empty
    const hasPosition = typeof developer.position == 'string' && developer.position.trim() != '';
    //  If returns true,both values are valid
    return hasFirstName && hasPosition;
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
router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id)
            .then(developer => {
                //  If function returns id,show it
                if(developer) {
                    res.json(developer);
                }
                //  Else
                else {
                    //  Forwards to error handler in app.js
                    next();
                }
            });          
});

//  Add developer post
router.post('/', (req, res, next) => {
    if(validDeveloper(req.body)) {
        //  Insert into db
        queries.create(req.body).then(developer => {
            //  Needs to be developer[0],because create() returns array(only 1 element -> [0])
            res.json(developer[0]);
        });
    } else  {
        next(new Error('Invalid developer'));
    }
});

//  Update developer
router.put('/:id', isValidId, (req, res, next) => {
    //  If update values are valid
    if(validDeveloper(req.body)) {
        //  Update developer
        queries.update(req.params.id, req.body)
                .then(developer => {
                    res.json(developer[0]);
                });
    } else {
        next(new Error('Invalid developer'));
    }
});

//  Delete developer
router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id)
        .then(() => {
            res.json({
                deleted: true
            });
        });
});

//  Export router so it can be used outside this folder
module.exports = router;