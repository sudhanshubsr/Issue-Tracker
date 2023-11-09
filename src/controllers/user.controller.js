import User from '../models/user.model.js';

export default class UserController{
    static getSignInPage(req, res){
        res.render('sign_in_page',{
            title: 'Sign In'
        })
    } 
    static getSignUpPage(req, res){
        res.render('sign_up_page',{
            title: 'Sign Up'
        })
    }
    static createUser(req, res) {
        const { name, email, password, confirmpassword } = req.body;
    
        if (password !== confirmpassword) {
            req.flash('error', 'Passwords do not match');
            res.redirect('/sign-up');
        } else {
            const existingUser = User.findOne({ email: email });
            if(!existingUser){
                req.flash('error', 'Email already exists');
                res.redirect('/sign-up');
            }else{
                const newUser = new User({
                    username: name,
                    email: email,
                    password: password,
                });
        
                User.create(newUser)
                    .then((user) => {
                        console.log(user);
                        req.flash('success', 'Account Created Successfully');
                        res.redirect('/sign-in');
                    })
                    .catch((err) => {
                        console.log(err);
                        req.flash('error', 'Error creating user');
                        res.redirect('/sign-up');
                    });
            }
            
        }
    }

    static userSession(req, res){
        req.flash('success', 'Logged In Successfully');
        res.redirect('/');
    }
    static destroySession(req,res){
        req.logout((err)=>{
          if(err){
          console.log('Error in destroying session',err);
          }else{
            req.flash('success','Logged out Successfully')
            return res.redirect('/');
          }
        });
        
  
      }

}