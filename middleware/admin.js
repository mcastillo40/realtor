// Validates whether the user is allowed to modify data and is an admin
module.exports = function (req, res, done){
    if(!req.user.isAdmin) return res.status(403).send('Forbidden: Not allowed to modify data');

    done();
}