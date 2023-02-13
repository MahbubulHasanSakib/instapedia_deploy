const express=require('express')
const router=express.Router()
const path=require('path')
const {isAuth}=require('../middlewares/authMiddleware')
const multer=require('multer')
const {createStory,getStories} = require('../controllers/storyController')
const { v4: uuidv4 } = require('uuid')
const inMemoryStorage=multer.memoryStorage()
/*const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"public/uploads")
    },
    filename:(req,file,callback)=>
    {
        callback(null, uuidv4() + '-' + Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:storage}); */

const upload = multer({ storage: inMemoryStorage });

router.get('/',isAuth,getStories)
router.post('/',isAuth,upload.single('storyImg'),createStory)
//router.post('/updateProfile',isAuth,upload.single('profilePic'),updateProfile)
module.exports=router