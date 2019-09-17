const passport = require('passport');
require('../config/passport')(passport)

module.exports = (app) => {
    const user = require('./controller');

    // Register users
    app.post('/register', user.register);

    // Login the user
    app.post('/login', user.login);

    // Return current user
    app.get('/current', passport.authenticate('jwt', {session: false}), user.current);

    // Update the user
    app.put('/user', passport.authenticate('jwt', {session: false}), user.update);

};