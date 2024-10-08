import mongoose , {Mongoose, Schema, mongo} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videosSchema = new Schema( {
    
        videoFile : {
            type : String , //cloudnary
            required : true,
        },
        thumbnail : {
            type : String, // cloudnary
            required : true
        },
        title : {
            type : String, 
            required : true
        },
        description : {
            type : String, 
            required : true
        },
        duration : {
            type : Number, // cloudnary0
            required : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean ,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }



} , {timestamps : true,})

videosSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("video" , videoSchema)