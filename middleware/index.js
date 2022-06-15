exports.isLoggedIn = (req, res, next) => {
if(req.isAuthenticated()){
    return next();
}
req.flash("error", "You need to be logged in to access the page")
res.redirect('/login');
} 

exports.isalreadyloggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
req.flash("error", "You are already logged in")
    res.redirect('/')
}
