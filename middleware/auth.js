const jwt = require('jsonwebtoken');
const config = require('config');

// Validates whether the token provided by the user is valid
module.exports = function authorize(req, res, done) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send('Access Denied: No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded; 
        done(); 
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}