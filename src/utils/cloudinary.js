import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});
// cloudinary.config({
//     cloud_name: 'dc51odhus',
//     api_key: '229479524465721',
//     api_secret: 'UYS2hdHpi2oY3h8ETFEv8Nejhi0',
//     secure: true,
//   });
  
  

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null 
        // uploading on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto"
        })

        // file uploaded successfully
        console.log("File uploaded successfully" , response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // removing local saved temp file as the upload operation failed
        return null;
    }
} 
export {uploadOnCloudinary}