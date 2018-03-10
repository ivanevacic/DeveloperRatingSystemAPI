const express = require('express');
const router = express.Router();

//  Import queries
const queries = require('../db/queries');

//  Login route
router.get('/', (req, res) => {
    res.json({
        message: '/ auth route works!'
    });
});

//  Validate user function
function validateUser(user) {
    //  Email validation
    const validEmail =  typeof user.email == 'string' &&
                               user.email.trim() != '';
    //  Password validation
    const validPassword =  typeof user.email == 'string' &&
                                user.email.trim().length >= 6;
    return validEmail && validPassword;
}


//  Register route
router.post('/signup', (req, res, next) => {
    //Validation
    if(validateUser(req.body)){
        queries.getOneByEmail(req.body.email)
                .then(user => {
                    //  If user not found
                    if(!user) {
                        //  then email is unique(GOOD)
                        res.json({
                            user,
                            message: 'Entered password is unique'
                        });
                    } else {
                        //  email in use
                        next(new Error('Email in use'));
                    }                   
                });
    }   else {
        //  With next() we pass error to the error handler
        next(new Error('Email and password aren\'t in good format'));
    }
});

//  Exports route
module.exports = router;