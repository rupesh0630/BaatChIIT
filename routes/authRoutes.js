const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        hd: '*',
        prompt: 'select_account',
        scope: ['email', 'profile']
    }));
    
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/chat');
        }

    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
