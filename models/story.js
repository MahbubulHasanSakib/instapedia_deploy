const mongoose=require('mongoose')
const Schema=mongoose.Schema

const storySchema=new Schema({

    story_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    story_username:{type:String,required:true},
    story_image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Story=mongoose.model('story',storySchema)
module.exports=Story