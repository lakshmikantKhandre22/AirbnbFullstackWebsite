const Joi = require('joi');

//Joi is a popular data validation library for Node.js / npm used to validate user input, request bodies, query params, configs, etc.

//Joi provides a powerful and flexible way to define validation rules for your data, making it easier to ensure that the data your application receives is in the expected format and meets certain criteria.
//Joi returns a object containing key value pairs 



module.exports.listingSchema = Joi.object({
  
    listing:Joi.object({

        title: Joi.string().required(),
        description:Joi.string().required(),
        location: Joi.string().required(),
        country:Joi.string().required(),
        price: Joi.number().required(),
        image:Joi.string().allow("",null),
        city: Joi.string().required(),   // add this

    }).required()   //listing is required 



    
  

  //JOI is needed for the validation of user input  
    //Joi is used for the server side validation 
    

  //IN Node.js 
  //error returns a error object 

});




//Server side validation using the Joi librarty for the review  

//Schema for the review validation using JOI library 

module.exports.reviewSchema = Joi.object({

    review: Joi.object({

        rating: Joi.number()
            .required()
            .min(1)
            .max(5),

        comment: Joi.string()
            .required()

    }).required()

}); 


