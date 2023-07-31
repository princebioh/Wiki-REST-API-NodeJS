const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Article = require("./models/articels");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});


// GET ALL ARTICLES //
app.route("/articles")
    .get(async (req,res) => {
        const blogArticles = await Article.find({});
        res.send(blogArticles);
    })

    .post(async (req,res) => {
        await Article.create({
            title: req.body.title,
            content: req.body.content,
        })
            .then(()=>{
                res.send("Successfully Posted Data to Server");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error Creating Article!")
            });
    })

    .delete( async (req,res) => {
        await Article.deleteMany({})
            .then((data) => {
                console.log(data);
                if (data.deletedCount === 0){
                    res.send("No DATA Deleted!!")
                } else{
                    res.send("Successfully Deleted!");    
                }
            })
            .catch((error) => {
                console.log(`Error : ${error}`);
                res.send("Failed to delete!");
            });
    });



// GET SPECIFIC ARTICLES //
app.route("/articles/:articleTitle")
    .get( async (req, res) => {
        queryTitle = req.params.articleTitle;
        await Article.findOne({title: queryTitle})
            .then((data) => {
                console.log(data);
                res.send(data);
            })
            .catch((error) => {
                console.log(error);
                res.send("Failed !");
            });
    })

    .put( async (req, res) => {
        queryTitle = req.params.articleTitle;
        updatedPost = {
            title: req.body.title,
            content: req.body.content
        }
        await Article.replaceOne({title : queryTitle}, updatedPost)
            .then((dbResponse) => {
                if(dbResponse.modifiedCount !== 0){
                    res.send("Update Successful");
                } else {
                    res.send("No Document Updated!");
                }
            })
            .catch((error) => {
                console.log(error);
                res.send("Operation Failed");
            });
        
    })

    .patch( async (req, res) => {
        queryTitle = req.params.articleTitle;
        await Article.updateOne({title : queryTitle}, req.body)
            .then((dbResponse) => {
                if(dbResponse.modifiedCount !== 0){
                    res.send("Field Updated Successfully");
                } else {
                    res.send("No Document was updated!")
                }
            })
            .catch((error) => {
                console.log(error);
                res.send("Error Occurred !");
            });
    })

    .delete( async (req, res) => {
        queryTitle = req.params.articleTitle;
        await Article.deleteOne({title : queryTitle})
            .then((dbResponse) => {
                if(dbResponse.deletedCount !== 0){
                    res.send("File Deleted Successfully");
                } else {
                    res.send("No File was Deleted !");
                } 
            })
            .catch((error) => {
                console.log(error);
                res.send("Error Occurred!!");
            });
    });