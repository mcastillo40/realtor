const { User } = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

/**
 * @endpoint < route 'auth/' 
 * @method POST
 * @body [{ name, email, password }]
 * @description Logins user if they provide the necessary information and a 
 *  token is generated for their use of the website
 */
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = await user.generateAuthToken();

    res.send(token); 
    } catch (error) {
        return res.status(500).send(`Server Error: `, error);
    }
});

// Validates that an email and password were provided and if based on database parameters
function validate(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router; 