 if(process.env.NODE_ENV != "Production")
 {
   require('dotenv').config()
 }

 


const express = require("express");    //setting up and express app  
const app = express();
const path=require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");    //importing ejs mate package to generate templates 
const wrapAsync =require("./Utils/wrapAsync.js");   //importing wrap async function ot handle the asynchronous errors 

const Review=require("./models/review.js");   //importing review model to create review for the listing and store the review in the database  

const CustomErrorclass =require("./Utils/CustomErrorclass.js");   //importing wrap async function ot handle the asynchronous errors 

const {listingSchema,reviewSchema}=require("./schema.js");  
//importing listingschema for the client side validation 

const session=require("express-session"); 
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash"); 


//Authntication middlewares(libraries) mpm packages 
const passport=require("passport");   //importing the passport middleware 
const LocalStrategy = require("passport-local");  //USERNAME AND Password 
const User=require("./models/user.js"); 



const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);






app.set("view engine","ejs");  //using ejs as view engine to render pages dynamically 

app.set("views",path.join(__dirname,"views"));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true })); //to get the data 

app.engine("ejs",ejsMate);  //use ejs engine genarate templates 






//using middleware to render static files 
app.use(express.static(path.join(__dirname,"/public")));





//1.. connecting node with mongoDb on local device 
// const mongo_URL="mongodb://127.0.0.1:27017/wanderlust"



//2..conncecting node with  mongoDB Database   using cloud  using MongoDB ATLAS 
const dburl=process.env.ATLASDB_URL;

//Imp Connection string 
//storing database on cloud using mongoDBATLAS instead of Local system 




async function main() {
    await mongoose.connect(dburl);

}


//async function returns a promise 

main()
.then(() => {
    console.log("database connected successfully");  
})
.catch((err) => {
    console.log(err);
});




// app.get("/", (req, res) => {
//     res.send("working");
// });
 




//store the information of the session in the mongoDb Atlas 

const store=MongoStore.create({
    mongoUrl: dburl,    //storing the session on the mongoDB Atlas 
    crypto:{
        secret:process.env.SECRET  //no needed to see everyone while uploading on github  
    },
    touchAfter: 24*3600,
    
})
store.on("error",(err)=>{
    console.log("Error in Mongo Session Store", err);
});

//creating a session middleware to store the user information 
app.use(session({
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));


//using the connect flash middleware to flash the messages only once 
app.use(flash())




//Authentication setup in Express + MongoDB apps using Passport. and sessiojn management  

//passport middlewares  (passport automatically handle authentication methods)

// Passport-Local Mongoose will add a username,
// hash and salt field to store the username, Automatically 




app.use(passport.initialize());  //initailize the passport 

app.use(passport.session()); //User must login only once in the session and no need login again throughtout the session 

passport.use(new LocalStrategy(User.authenticate()));   //“Use Local Authentication (username/password) and use User.authenticate() to verify users.” 


// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());     //After login:  Store user ID into session
passport.deserializeUser(User.deserializeUser());   //Retrieving the full user data from the database using the user ID stored in the session. 



//passport is express Authentication middleware that provides the build in methods  for the Authentiucation 
 



//Middleware for flashing the message after user creates/updates or deletes the listing 
app.use((req, res, next) => {

    // Flash messages available in all EJS pages
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");

    // Logged in user (Passport provides req.user)
    res.locals.currUser = req.user;

    next();
});
//first flash the message then go to the next() route handler or the middleware 







// app.get("/demouser", async (req,res)=>{
//     let fakeUser=new User({
//         email:"student@gamil.com",
//         username:"delta-student"   //passport automatcially add the username field  
//     })
//                                             //username //password
//     let registeredUser = await User.register(fakeUser,"helloworld" );

//     res.send(registeredUser);
// })


 
 




//importing the listing router to handle all the listing related routes
const listingRouter = require("./routes/listing.js");

//if the route start from the listing then go to the listing express router 
//using the listing router to handle all the listing related routes
app.use("/listings", listingRouter);
                         //if the request comes to ths route then go to the listing router 






// using the review router to handle all the review related routes
const reviewRouter = require("./routes/review.js");
app.use("/listings/:id/reviews", reviewRouter);   //if the request comes to this route got to the review route 



//User router if request comes /user then this router is used 
const userRouter=require("./routes/user.js"); 
app.use("/",userRouter);   //if the request comes to this route then go to user router 


  
 


//if any of the route is not match then the error is pased to middleware with custom error class 
app.all(/.*/, (req, res, next) => {
  next(new CustomErrorclass(404, "Page not found"));
});



//Error Handling Middleware   
//  if above at any route if error occurs request comes to this middleware 
app.use((err,req,res,next)=>{
    // res.send("Something went Wrong");  //here the express error is catched and send the response for the error 
   
    //here we catch the error from the above route now send the response 
    let {statuscode=500,message="something went wrong"}=err;   //get the statuscode and message from the err and send the response 
    // res.status(statuscode).send(message);
   


    //render a ejs file if the error occurs 
    res.status(statuscode).render("error.ejs",{err});   //send error to ejs to dynamically render the error 


// That error object contains things like:
// {
//   name: "CastError",
//   message: "Cast to ObjectId failed...",
//   path: "_id"
// }

})


//server is started and listingon port 8080 


app.listen(8080, () => {
    console.log("server is running on port 8080");
});











