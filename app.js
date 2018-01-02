let express =require('express');
let app = express();
//let Web3= require('./public/js/web3.min.js');
let port = process.env.port || 3000;

app.set('view engine', 'ejs');
app.set('views', './src/view');
app.use(express.static(__dirname + '/public'));



app. get('/', (req, res) => {
	res.render('index');
});
app.get('/accounts', (req, res) => {
    res.render('accounts');
});
app.get('/addproduct', (req, res) => {
    res.render('addproduct');
});
app.get('/setnewamount/:add/:account', (req, res) => {
    res.render('setnewamount', { add: req.params.add, account: req.params.account});
});
app.get('/ownership/:add/:account', (req, res) => {
    res.render('ownership', { add: req.params.add, account: req.params.account});
});
app.get('/addaction/:add/:account', (req, res) => {
    res.render('addaction', { add: req.params.add, account: req.params.account});
});
app.get('/merge/:add/:account', (req, res) => {
    res.render('merge', { add: req.params.add, account: req.params.account});
});
app.get('/:address', (req, res) => {
  res.render('product', { address: req.params.address});
 });

app.listen(port, () => {
	console.log('Server is listening on port' + port);
})