// In Express.js, an Express Router is like a mini application
//or a separate route handler module used to organize routes.

// Instead of writing all routes in one huge app.js file,
// we split them into different router files.


// 🚀 Think of Router like this

// Router File   	Handles
// listing.js	  listing routes
// review.js	   review routes
// user.js	    authentication/user routes


//this is the golden time


const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");  //importing the cookie-parser middleware to handle cookies in Express.js

// Import Routers
const posts = require("./routes/post.js");
const users = require("./routes/user.js");


// Middleware
app.use(express.json());


// Use Routers
app.use("/posts", posts);

app.use("/users", users);





app.use(cookieParser("secretcode"));   //using the cookie-parser middleware to parse cookies in incoming requests
// cookie-parser is an Express middleware used to read cookies sent by the browser.


// It parses cookies and makes them available in:
// req.cookies

// Why We Need It


// Without cookie-parser:

// req.cookies
// is:
// undefined

// because Express cannot understand cookies automatically.

// cookie-parser converts raw cookie data into a JavaScript object.



//Accessing Cookies Sent by the Browser
app.get("/",(req,res)=>{
    console.dir(req.cookies);  //accessing the cookies sent by the browser in the incoming request  
    res.send("Welcome to the Express Router Example");
});


//Accessing Cookies Sent by the Browser
app.get("/greet",(req,res)=>{
    const name = req.cookies.name;  //accessing the value of the "name" cookie sent by the browser in the incoming request
    res.send(`Hello, ${name}!`);  //sending a greeting message back to the client using the value of the "name" cookie
});


//sending cookies to the client using res.cookie() method. This method allows you to set a cookie in the response that will be sent back to the client's browser.
app.get("/cookies",(req,res)=>{
    res.cookie("greet", "hello");
    res.cookie("age", 21);
    res.send("sent you some cookies");
})



// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Airbnb API");
});








//signed cookies are cookies that have been cryptographically signed to ensure their integrity and authenticity. 
// They are used to prevent tampering and ensure that the cookie data has not been modified by the client. 


//1. send a signed cookies  
app.get("/get-signed-cookie",(req,res)=>{
res.cookie("madein", "India", { signed: true });  //setting a signed cookie named "madein" with the value "India" in the response sent back to the client
res.send("sent you a signed cookie");
});



//2. READ THE SIGNED COOKIE 
app.get("/get", (req, res) => {
    console.log(req.signedCookies);
    res.send(req.signedCookies);
}); 






// Start Server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});


