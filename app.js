const express = require("express");
const postModel = require("./models").post;
const commentModel = require("./models").comment;
const app = express();
app.use(express.json());
const PORT = 4000;
//homepage
app.get("/",(req,res)=>{
    res.json({
        status:1,
        message:"Welcome to HomePage"
    })
});
//posts
app.get("/posts",(req,res)=>{
    postModel.findAll({
        include:{
            model: commentModel
        }
    }).then((data)=>{
        res.status(200).json({
            status:1,
            message: data
        })
    }).catch((err)=>{
        res.status(500).json({
            status:0,
            message:"Cannot Fetch Data from the Database->"+err
        })
    })
});
//comments
app.get('/comments',(req,res)=>{
    commentModel.findAll({
        include:{
            model:postModel
        }
    }).then((data)=>{
        res.status(200).json({
            status:1,
            message: data
        })
    }).catch((err)=>{
        res.status(500).json({
            status:0,
            message:'There is some error while fetching the data->'+err
        })
    })
});
//insert values into commentModel and PostModel
// postModel.build({
//     id:2,
//     name:"Sample Post 2 ",
//     content:"Sample Content 2"
// }).save();
// commentModel.build({
//     id:2,
//     userName:"Ram Kumar",
//     content:"Sample Comment 2",
//     postId:2
// }).save();
app.listen(PORT,()=>{
    console.log("Application is listening at"+PORT);
})