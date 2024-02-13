// require('dotenv').config({path : './env'})
import dotenv  from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: `./env`
})


connectDB()
.then(() =>{
    try{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}catch(error){
    app.on("error" , (error)=>{
        console.log ("Error while connecting to the database" , error)
        throw err
       })
}

})
.catch((err) => {
    console.log("Mongodb connection failed" , err);
})











/*
import { express } from "express";
const app = express()
( async ()=>{
    try{
       await mongoose.connect (`${process.env.MONGODB_URI} / ${DB_NAME}`)
       app.on("error" , (error)=>{
        console.log ("Error while connecting to the database" , error)
        throw err
       })

       app.listen(process.env.PORT , ()=>{
        console.log(`app is listeing on port ${process.env.PORT}`)
       })

    }catch(error){
        console.error("error" , error)
        throw err
    }
})()
*/