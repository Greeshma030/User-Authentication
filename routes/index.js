const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index' , { });
})

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/");
})

module.exports = router