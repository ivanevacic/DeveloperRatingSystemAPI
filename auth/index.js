const express = require('express');
const router = express.Router();
//  Import bcrypt
const bcrypt = require('bcrypt');
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
                    //  If user with that email is not found
                    if(!user) {
                        //  then email is unique(GOOD)
                            //  hash password
                            bcrypt.hash(req.body.password, 10)  //  saltRounds -> higher number,longer it takes to compute hash
                                    .then((hash) =>  {
                                    //  insert user into db
                                        //  define user
                                        const user = {
                                            email: req.body.email,  //  user's email
                                            password: hash, //  hashed password we 'created' from user's password
                                            date: new Date()  //    timestamp when user registered
                                        };
                                            //  
                                            queries.registerUser(user)
                                                    .then(user => {
                                                        res.json({
                                                            user,
                                                            message: 'User registered successfully'
                                                        });
                                                    });                                              
                                    });                       
                    } else {
                        //  With next() we pass error to the error handler
                        //  email in use
                        next(new Error('Email in use'));
                    }                   
                });
    }   else {
        //  With next() we pass error to the error handler
            //  Both password and email are wrong
        next(new Error('Both password and email are wrong'));
    }
});

//  Exports route
module.exports = router;