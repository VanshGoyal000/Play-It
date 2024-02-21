import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { Apiresponse } from "../utils/Apiresponse.js";
const registerUser = asyncHandler(async(req , res) => {
   // get user details from frontend
   // validation
   // check if user exist : username and email
   // check for img , check for avatar
   // upload them on cloudairy , avatar
   //create user object - create entery in db
   // remove pass and refresh token from response
   // check for user creation
   // return  res

   const{username , fullName , email , password} = req.body
   console.log("email : " , email);
   if(
      [fullName , email , username , password].some((field) => field?.trim() === "")
   ){
    throw new ApiError(400 , "fullname is required")
   }

   const existedUser = User .findOne({
      $or: [{username} , {email}]
   })

   if(existedUser){
      throw new ApiError(409 , "User with email or username exists")
   }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
   throw new ApiError(400 , "Avatar is required")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
   throw new ApiError(400 , "Avatar not uploaded");
  }

  
 const user = await User.create({
   fullName,
   avatar:avatar.url,
   coverImage : coverImage?.url || "",
   email,
   password,
   username : username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
   throw new ApiError(500 , " server error")
  }

  return res.status(201).json(
   new Apiresponse(200 , createdUser , "user regestered successfully")
  )

})

export {registerUser}