//how the session is created 

// User logs in visit the site 
//    ↓
// Session created
//    ↓
// Session ID stored in cookie
//    ↓
// Browser sends cookie on every request
//    ↓
// Server identifies user





const express = require("express");

const app = express();

//middle works betwen the request and response cycle before sending the response  
const session=require("express-session");  //importing the express-session middleware to handle sessions in Express.js


// It is a middleware used with Express.js to store flash messages in the session.
const flash=require("connect-flash");

const path=require("path");
 



app.set("view engine","ejs");  //using ejs as view engine to render pages dynamically 

app.set("views",path.join(__dirname,"views"));





// Session Middleware

// session(options)
// Create a session middleware with the given options.
// Note Session data is not saved in the cookie itself,
//  just the session ID. Session data is stored server-side.

//The object inside session({ }) contains session options.


app.use(session({
    secret: "mysupersecret",  // The secret option is a string that is used to sign the session ID cookie. It is important to choose a strong and unique secret to ensure the security of your sessions. This secret is used to prevent tampering with the session data on the client side.
    resave: false,           //Controls whether session is saved again even if unchanged.
    saveUninitialized: true}));  // Controls saving of empty sessions.


//Now after using the session middleware for every request there is a session id stored   
//Session store the information temporarily 

//SESSION IS ALSO ACCESED IN DIFFERNT BROWSER TABS 
 


// It is a middleware used with Express.js to store flash messages in the session.
app.use(flash());
//flash message will flash only once  



app.get("/test",(req,res)=>{
    res.send("SessioN Successful");     
})



// app.get("/reqcount",(req,res)=>{
// if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`You visited this page ${req.session.count} times`);
// })




//Storing and Using the Session Info

//1. storing the session INFO 
app.get("/register",(req,res)=>{
    let {name="Anonymous"}=req.query;
    req.session.name=name;

   req.flash("success","user registerd successfully");
   res.redirect("/hello");

})




//2. Using the session Info 
app.get("/hello",(req,res)=>{
    res.locals.successMsg=req.flash("success");   //render success message into ejs page 
    res.render("page.ejs",{name:req.session.name}); // send the name of currently running session 
});




// Start Server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});






