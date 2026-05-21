//this program is used to insert Bulk of data in statabse using node.js with the help  of mongoose package 




const mongoose=require("mongoose");

const initdata=require("./data.js");  //get the data from the data.js to insert in database 


const Listing =require("../models/listing.js");   //importing listing to for schema fo the document 



//connecting mongoDB with node.js using mongoose to add data in database 

 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 }
      
 //adding document in wanserlust database 
 
 //conectingting with database is asynchronous action so async await is used
 
 
 //main function returns a promise so we can use then and catch method to handle the promise
 main().then((res)=>{
     console.log("database connected successfully");
 }).catch((err)=>{
     console.log(err);
 });


 
//this function add the data in database 

 const initDB= async () => {
   
    await Listing.deleteMany();  //listing is a collection created by model 



     // assign owner to every listing
    const listingsWithOwner = initdata.data.map((obj) => ({
        ...obj,
        Owner: "6a01704dfb6ffdf2c299f11c"
    }));



    //inserting data into listing collection as per the listing schema defined in the listing.js file
    await Listing.insertMany(listingsWithOwner);  //accseing key from the data imported 
    
    //added a bulk of data in the database using insertMany() method of mongoose which is used to insert multiple documents in the collection at once
    
    
    console.log("Data was intitialized");

    
 }
 initDB();  //calling the function ot run command to add the bulk of data in the database 


 


