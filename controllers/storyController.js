const User = require('../models/user')
const Post = require('../models/post')
const Story = require('../models/story')
const Follow = require('../models/follow')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const cloudinary=require('../utlis/cloudinary')
const path=require('path')


const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();

const createStory=asyncHandler(async(req,res)=>
{
    const findUser=await User.findById(req.user._id)
   // const imagePath = String('/' + req.file.destination.split('/').slice(1) + '/' + req.file.filename);
    //console.log(imagePath)
    const extName = path.extname(req.file.originalname).toString();
                 const file64 = parser.format(extName, req.file.buffer);
                 const result = await cloudinary.uploader.upload(file64.content,{
                     uploads: "products",
                     // width: 300,
                     // crop: "scale"
                     public_id: `${Date.now()}`,
                     resource_type: "auto",
                 })
    const imagePath=result.secure_url;
    const newStory=new Story({
        story_user:req.user._id,
        story_username:req.user.username,
        story_image:imagePath
   })
   await newStory.save()
   .then((story)=>console.log(story))
   .catch((err)=>console.log(err))
   const stories = await Story.find({}).sort({'createdAt': -1})
   console.log(stories)
   return res.send(stories)
})
const getStories=asyncHandler(async(req,res)=>
{
    try {
        const stories = await Story.find({}).sort({'createdAt': -1})
        return res.send(stories)
    } catch (error) {
       return res.status(404).send('Server error')
    }
})

module.exports = {
    createStory,getStories
}