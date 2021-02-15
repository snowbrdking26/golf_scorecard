const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3001;


// ------ new---------
// var newpage = require('./controllers/newpage.js')

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// ------ new---------

// app.set('views', 'app/views');
// app.set('view engine', 'jade');

// ------ new---------


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
const newpageController = require('./controllers/newpage.js')

// ==============
// USE OF CONTROLLERS
// ==============

app.use('/golfers', golfersController);
app.use('/scorecards', scorecardsController);
app.use('/session', sessionsController);
app.use('/newpage', newpageController);


// ------ new---------
// app.use('/newpage', newpage)
// ------ new---------


// ==============
// ROUTES
// ==============


app.get('/', (req, res) => {
    res.render("index.ejs");
    // res.send('test')
});


app.listen(PORT, console.log('My Golf Scorecards App on PORT:', PORT));
