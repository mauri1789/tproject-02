var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var routes = require("./routes");
var passport = require("passport");
var setUpPassport = require("./setuppassport");

var app = express();
mongoose.connect("mongodb://localhost:27017/tproject02");

setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
//allows each session to be encrypted from the client.
// this deters hackers from hacking into users cookies
    resave: true,
// session will be updated even when it hasn't been modified
    saveUninitialized: true
// this resets sessions that are uninitialized
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});