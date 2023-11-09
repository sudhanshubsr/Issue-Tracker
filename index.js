
import express from 'express';
import homeRouter from './src/routes/home.router.js';

import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import db from './src/config/mongoose.config.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import middleware from './src/middlewares/flashmessage.middleware.js';

import passportLocal from './src/config/passport-local.js';
import passport from 'passport';

const app = express();
    



//? session store in mongodb

const sessionStore = new MongoStore({
    mongoUrl: 'mongodb://localhost:27017/Issue-Tracker',
    mongooseConnection: db,
    autoRemove: 'interval',
    autoRemoveInterval: 10,
},(err)=>{
    if(err){
        console.error('MongoStore Error:', err);
    }
})


//? using urlencoded for post request decoding data
app.use(express.urlencoded({extended: true}));

// ? Set up ejs layouts
app.use(ejsLayouts);


// ? using cookie parser
app.use(cookieParser());




// ? Set up static files
app.use(express.static(path.join(path.resolve(),'src','assets')))

// ? Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views')


// ? Set up session

app.use(session({
    name: 'Issue-Tracker',
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24,
    }
}))

//? Set up passport

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//? Set up flash messages
app.use(flash())
app.use(middleware.setFlashMessage)


// ? Set up routes
app.use('/', homeRouter);


// ? Set up error handling
app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('Server is running on port 3000');
})