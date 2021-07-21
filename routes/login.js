const express = require("express");
const passport = require("passport");
const router = express.Router();
const user = require("../models/user");

router.get('/',(req,res)=>{
    res.render('login' , { name : "greeshma"});
})

router.post('/',passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect: "/login",
    failureFlash : true,
    successFlash : true,
}));

module.exports = router