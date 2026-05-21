const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");


// Configure Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "wanderlust_DEV",

        allowed_formats: ["png", "jpg", "jpeg"],
    },
});


// Export cloudinary and storage
module.exports = {
    cloudinary,
    storage,
};

