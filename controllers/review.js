
const Listing = require("../models/listing.js");

const Review = require("../models/review.js");





//Async callback handler  Module 
module.exports.createReview=async (req, res) => {

        let { id } = req.params;

        let listing = await Listing.findById(id);

        let newreview = new Review(req.body.review);

        newreview.author=req.user._id;

        await newreview.save();

        listing.reviews.push(newreview);

        await listing.save();
        req.flash("success","new Review Created");  //flash message after creating a new Review 
        res.redirect(`/listings/${id}`);

    };



    module.exports.deleteReview=async (req, res) => {
    
            let { id, reviewId } = req.params;
    
            await Review.findByIdAndDelete(reviewId);
    
            await Listing.findByIdAndUpdate(
                id,
                { $pull: { reviews: reviewId } }
            );
           req.flash("success","Review deleted")
            res.redirect(`/listings/${id}`);
    
        };
