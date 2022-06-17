require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session")
const MongoStore = require('connect-mongo')

const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const user = require('./models/user');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
let db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

port = process.env.PORT || 8000

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/static'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

// passport configuration
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/', indexRoute);

app.listen(port, () => {
    console.log(`Application started successfully on port ${port}`);
});