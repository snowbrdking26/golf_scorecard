const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log('My Golf Scorecards App on PORT:', PORT));

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

// ==============
// USE OF CONTROLLERS
// ==============

app.use('/golfers', golfersController);
app.use('/scorecards', scorecardsController);
app.use('/session', sessionsController);

// ==============
// ROUTES
// ==============

app.get('/', (req, res) => {
    res.render("index.ejs");
});



// app.get('/', (req, res) => {
//     res.send(stockKey);
// });
