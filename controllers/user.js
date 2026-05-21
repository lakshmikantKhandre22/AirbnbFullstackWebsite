const User = require("../models/user.js"); 




//Async Callback Handler Module

module.exports.signupuser=async (req, res) => {

    try{
    let { username, password, email } = req.body;

    // create new user object
    const newUser = new User({
      email,
      username,
    });
    // register user using the register methodd of the passport middleware 
    const registeredUser = await User.register(newUser, password);

    console.log(registeredUser);


     // AUTO LOGIN USER AFTER SIGNUP
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to WanderLust!");

      return res.redirect("/listings");
    });

  } 
catch(e){
    req.flash("failure",e.message);
    res.redirect("/signup");   //if user is alredy exist or another error ocuurs flash the error and redirect to the signup page 
}
  };






module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs"); 

};




module.exports.AutomaticLoginAfterSignup=(req, res) => {

    req.flash("success", "Welcome back to WanderLust!");

    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
  };




  module.exports.Logout=(req, res, next) => {

    //method of passport middleware 
    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");

        res.redirect("/listings");
    });
};

