const express = require("express");
const passport = require("passport");
const router = express.Router();
const user = require("../models/user");
const {isalreadyloggedin} = require("../middleware/index")

router.get('/', isalreadyloggedin, (req,res)=>{
    res.render('login' , {});
})

router.post('/',passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect: "/login",
    failureFlash : true,
    successFlash : true,
}));

module.exports = router