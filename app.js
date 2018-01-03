var express = require("express");


//let product = require('./product');

var app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.set("views", "./views");

app.get("/index", function (req, res) {

	//console.log(test.name);

	//var a = product.sayHello("hihi");

	//let data = ['a', 'b', 'c'];
	//res.render("index", { data : data , a : a } ) ;
	res.render("index") ;
});

app.get('/tranferOwnership/:add/:account', (req, res) => {
    res.render('tranferOwnership', { add: req.params.add, account: req.params.account});
});
app.get("/accountInformation/:address", function (req, res) {
	res.render("accountInformation", { address: req.params.address}) ;
});
app.get('/addaction/:add/:account', (req, res) => {
    res.render('addAction', { add: req.params.add, account: req.params.account});
});
app.get('/setnewamount/:add/:account', (req, res) => {
    res.render('setNewAmount', { add: req.params.add, account: req.params.account});
});
app.get("/accounts", function (req, res) {
	res.render("accounts") ;
});
app.get('/merge/:add/:account', (req, res) => {
    res.render('merge', { add: req.params.add, account: req.params.account});
});
app.use(express.static(__dirname + '/public'));

app.get('/:address', (req, res) => {
	res.render('product', { address: req.params.address});
	});

app.get("/createproduct", function (req, res) {
	res.render("createproduct");
});