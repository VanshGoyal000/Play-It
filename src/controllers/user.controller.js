import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { Apiresponse } from "../utils/Apiresponse.js";

const generateAccessAndRefreshTokens = async (userId)=>{
   try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false}) // To bypass

      return{accessToken , refreshToken}
      
   } catch (error) {
      throw new ApiError(500 , "something gone wrong while genrating tokens")
   }
}

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

   const existedUser = await User.findOne({
      $or: [{username} , {email}]
   })

   if(existedUser){
      throw new ApiError(409 , "User with email or username exists")
   }

//   const avatarLocalPath =  req.files?.avatar[0]?.path;
const coverImageLocalPath =req.files?.coverImage[0]?.path;

const avatarLocalPath = req.files.avatar[0]?.path;
// if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
//    const coverImageLocalPath = req.files.coverImage[0]?.path;
//    if (coverImageLocalPath) {
//       const coverImage = await uploadOnCloudinary(coverImageLocalPath)
//    } else {
//        console.error("Cover image path not found.");
//    }
// } else {
//    console.error("Cover image file not found in request.");
// }
if(!avatarLocalPath){
   throw new ApiError('400' , "avatar is required")
}

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
   throw new ApiError(400 , "Avatar not uploaded");
  }

  
 const user = await User.create({
   fullName,
   avatar:avatar.url,
   coverImage : coverImage?.url || " ",
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

const loginUser = asyncHandler(async (req , res) =>{
   // get data from req.body
   //username or email 
   // find the user
   // password check
   // access token and refresh token 
   // send cookies(secure)
   const {email , username , password} = req.body
   if(!username || !email){
      throw new ApiError(400 , "username or email is required")
   } 

   const user = await User.findOne({
      $or:[{username} , {email}]
   })

   if(!user){
      throw new ApiError(404 , "user not exist")
   }

   const isPasswordValid = await user.isPasswordCorrect(password)
   if (!isPasswordValid) {
      throw	 new ApiError(401 , 'Invalid credentials')
   }

   
})

export {registerUser , loginUser}