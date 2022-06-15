const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {isalreadyloggedin} = require("../middleware/index")

router.get('/', isalreadyloggedin,(req,res)=>{
    res.render('register' , {});
});

router.post('/',(req,res)=>{
    let newUser = new User({name : req.body.name , username: req.body.username});
    User.find(newUser)
        .then(() => {
req.flash("error", "User is already registered, Please login")
return res.redirect('/login')
        })
        .catch(() => {
            User.register(newUser,req.body.password,(err,user)=>{
                if(err){
                    console.log(err.message)
                    req.flash("error", err.message)
                    return res.redirect('/register');
                }else{
                    passport.authenticate("local")(req,res,()=>{
                        res.redirect('/');
                    })        
                }
            })
        })
})

module.exports = router