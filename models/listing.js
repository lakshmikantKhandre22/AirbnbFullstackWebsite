const mongoose = require("mongoose");
const review = require("./review");


//creating schema for the document 


const listingSchema = new mongoose.Schema({
    title: String,
    description: String,

    image: {
        filename: String,
        url: String
    },
    
    price: Number ,
    location: String,
    country: String,


    //one to may relation in mongoDB 
    //means storing id of child document  in the parent document i.e review id is stored in listing document  
    
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
     
    
   // 👉 Many Listings → One User   (One to many relationship )
 Owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
    } ,

 category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Mountain",
      "Beach",
      "Forest",
      "Arctic",
      "Camping",
      "City",
      "Pools"
    ]
  }

 
});



//👉 When a Listing is deleted, this code automatically deletes all Reviews linked to that listing.
// This is called cascade delete behavior.


//post middleware to delete the reviews for the listing when the listing is deleted
listingSchema.post("findOneAndDelete", async function(doc){   //after deleting the listing we have to delete the reviews for the listing
    if(doc){
        await review.deleteMany({   //deleteMany is a method to delete multiple documents from the collection           
            _id:{
                $in: doc.reviews   //delete the reviews which are in the reviews array of the listing document 
            }
        })
    }                   
}); 










const Listing = mongoose.model("Listing", listingSchema);
//Model creates a collection in mongoDB database  with the provided schema 

//Model is a class which has methods to create, read, update and delete documents in the collection
//Model creates a collection in the database with the provided schema and provides an interface to interact with the database



//exporting module to use in the another file 
module.exports = Listing;









// const mongoose=require("mongoose");


// //1.Create a Schema for listing 

// const ListingSchema=new mongoose.Schema({

//     title:{
//       type:String, //constraints/validations 
//       default:true
//     },
//     description:String,

//     image:{
//         type:String,
//         default:"https://www.freepik.com/free-photos-vectors/nature-view",

//         // set default image 
//         set:(v) => v==="" ? " https://www.freepik.com/free-photos-vectors/nature-view " :  v

//     },

//     price:Number,
//     location:String,
//     country:String,


// })


// //2. create  model(class) from the usign the schema to craete documents(objects)

                                                                                                                                                            
// const Listing=mongoose.model("Listing",ListingSchema);

// module.exports=Listing;
// //export model to import(use) in another file 
