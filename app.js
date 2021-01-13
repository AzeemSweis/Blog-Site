//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog! My name is Azeem Sweis and here I will make daily logs about my life - or at least try to. You can read my previous entries below, enjoy!";
const aboutContent = "I created this blog as a coding project, wanting to learn about ways to make a dynamic website that allows for changes without needing to edit the source code each and every time. I figured that a blog would be the perfect wy to implement and learn about something like that! I primarily used Node.js and certain packages, in addtion to HTML5 and CSS3 to make this possible.";
const contactContent = "If you are interested in learning more about my and my work, please visit my website below, where you will be able to get in touch with me through my email and various social media.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
})

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle == requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  })
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
