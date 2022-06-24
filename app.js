const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems= [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    const day = date.getDate();
    res.render('list', {typeOfDay: day, newItem: items});
});

app.get("/work", function(req, res) {
    res.render('list', {typeOfDay: "Work List", newItem: workItems});
});

app.get("/about", function(req, res) {
    res.render("about");
})

app.post("/", function(req, res) {
    const newItem = req.body.input;
    if(req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is up and running");
});