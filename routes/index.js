const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/index")

router.get('/', isLoggedIn, (req, res) => {
    res.render('index', {});
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
})

module.exports = router