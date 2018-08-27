const { User, validate } = require('../models/user'); 
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const authorize = require('../middleware/auth')

/**
 * @endpoint < route 'users/me' 
 * @method GET
 * @param _id
 * @description Provides information about the user: name, email, isAdmin
 */
router.get('/me', 
    authorize,

    async (req, res) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
});

/**
 * @endpoint < route '/users/' 
 * @method POST
 * @body [{ name, email, password, isAdmin }]
 * @description Creates a new user for the website and sets their privileges
 */
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check to see if user is already registered based on email
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered');

    try {
        // Create new user based on the information sent
        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        // Hash user's password to be saved in database
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);

        // Set user admin permission to false
        user.isAdmin = false; 

        await user.save();

        // Generate token to allow user to use website
        const token = user.generateAuthToken();

        user = _.pick(user, ['_id', 'name', 'email']);

        res.header('x-auth-token', token).send(user);
    } catch (error){
        return res.status(500).send(`Server Error: `, error);
    }
});

module.exports = router; 