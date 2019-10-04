module.exports = (app) => {
    const mail = require('./controller');

    // Create a new category
    app.post('/api/send_email/', mail.send);
};