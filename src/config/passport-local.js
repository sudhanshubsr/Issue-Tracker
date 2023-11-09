import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user.model.js';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user || user.password !== password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        })
        .catch((err) => {
            req.flash('error', 'Error in finding user');
            return done(err);
        });
}));



passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        if(!user){
            return done(null,false);
        }else{
            return done(null,user);
        }
    }).catch((err)=>{
        console.log("Error in Desrialzing User");
        return done(err);
    })
})

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/sign-in');
}
passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

export default passportLocal;