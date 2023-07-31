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

app.route("/articles")
    .get(async (req,res) => {
    const blogArticles = await Article.find({});
    // res.render("home", {blogPost : blogArticles});
    res.send(blogArticles);
})
    .post(async (req,res) => {
        try {
            const title = req.body.title;
            const content = req.body.content;

            await Article.create({
                title: title,
                content: content,
            });
            res.send("Successfully Posted Data to Server");
        } catch (error) {
            console.log(error);
            res.send("Failed to Post Data");
        }  
    })

