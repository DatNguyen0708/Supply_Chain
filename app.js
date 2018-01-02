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

app.get("/accountInformation/:address", function (req, res) {
	res.render("accountInformation", { address: req.params.address}) ;
});

app.get("/accounts", function (req, res) {
	res.render("accounts") ;
});

app.use(express.static(__dirname + '/public'));

app.get('/:address', (req, res) => {
	res.render('product', { address: req.params.address});
	});


