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

app.use(express.static(__dirname + '/public'));

app.get("/hello", function (req, res) {
	res.send("<font color=red>HELLO DUNG SO BU</font>");
});

app.post("/hello", function (req, res) {
	res.send("<font color=red>HIHI DUNG SO BU</font>");
});

app.get("/tintuc/:id", function (req, res) {
	var i = req.params.id;

	res.send("Serve id=" + i);
});

app.get('/:address', (req, res) => {
	res.render('product', { address: req.params.address});
	});

