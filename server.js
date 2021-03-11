const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3001;



// ==============
// MIDDLEWARE
// ==============

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'keyboardelephantreenocean',
    resave: false,
    saveUninitialized: true
}));


app.use(express.static('public'));

// ==============
// CONTROLLERS
// ==============
const golfersController = require('./controllers/golfers.js')
const scorecardsController = require('./controllers/scorecards.js')
const sessionsController = require('./controllers/sessions.js')
const DigitalScorecardController = require('./controllers/DigitalScorecard.js')
const CookiePolicyController = require('./controllers/CookiePolicy.js')
const DeleteAccountController = require('./controllers/DeleteAccount.js')






// ==============
// USE OF CONTROLLERS
// ==============

app.use('/golfers', golfersController);
app.use('/scorecards', scorecardsController);
app.use('/session', sessionsController);
app.use('/DigitalScorecard', DigitalScorecardController);
app.use('/CookiePolicy', CookiePolicyController);
app.use('/DeleteAccount', DeleteAccountController);





// ==============
// ROUTES
// ==============


app.get('/', (req, res) => {
    res.render("index.ejs");
    // res.send('test')
});


app.listen(PORT, console.log('My Golf Scorecards App on PORT:', PORT));
