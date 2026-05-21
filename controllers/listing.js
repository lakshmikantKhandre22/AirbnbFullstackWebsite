const Listing = require("../models/listing.js");


// INDEX ROUTE
module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});

    res.render("listings/index.ejs", { allListings });
};



//this is a module and 
//Async Callback Handler 





// NEW FORM                   //callback 
module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
};



// CREATE ROUTE                 //Async Callback Handler 
module.exports.createNewListing = async (req, res) => {

    let url=req.file.path;   //get url from the user requested to upload file 
    let filename=req.file.filename;
    console.log(url,"",filename);

     
    const newListing = new Listing(req.body.listing);

    // Save current logged-in user as owner
    newListing.Owner = req.user._id;

      
    newListing.image={url,filename};   //storing new image using url with path  in Listing Collection  mongoDBtabase  

    await newListing.save();

    req.flash("success", "New listing created!");

    res.redirect("/listings");
};



// SHOW ROUTE                async callback handler for controller 
module.exports.showListing = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("Owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        });

    if (!listing) {

        req.flash("error", "Listing does not exist!");

        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
                               //SEND LISTING with populated fields to 
                                
};






// EDIT FORM                    async callback handler for controller 
module.exports.rendereditForm = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {

        req.flash("error", "Listing does not exist!");

        return res.redirect("/listings");
    }

   let originalUrl=listing.image.url;
   originalUrl.replace("upload","/upload/h_300,w_250");
   


    res.render("listings/edit.ejs", { listing,originalUrl });
};








// UPDATE ROUTE                async callback handler for controller 
module.exports.updateListing = async (req, res) => {


    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });




    if(typeof req.file != "undefined ")
    {

      
        

    
    let url=req.file.path;   //get url from the user requested to upload file 
    let filename=req.file.filename;



    listing.image={url,filename};   //add image with url and filename in the Listing Collection 

    await listing.save();

    }


    req.flash("success", "Listing updated successfully!");


    res.redirect(`/listings/${id}`);


    
};





// DELETE ROUTE                 async callback handler for controller 
module.exports.deleteListing = async (req, res) => {


    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted!");

    res.redirect("/listings");
  
};













