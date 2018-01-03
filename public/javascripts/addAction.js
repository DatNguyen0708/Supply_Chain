function submit() {

    var account = document.getElementById('account').value;
    var product = document.getElementById('add').value;

    var newproduct = document.getElementById('newproduct').value;
    newproduct = newproduct.split(",");
    var unit = document.getElementById('unit').value;
    unit = unit.split(",");
    var amount = document.getElementById('amount').value;
    amount = amount.split(",");
    var ratio = document.getElementById('ratio').value;
    ratio = ratio.split(",");
    var executefrom = document.getElementById('x').value.toString();
    var password = document.getElementById('password').value;
    for (i = 0; i < ratio.length; i++) {
        if (isNaN(ratio[i])) {
            alert("WRONG RATIO, IT IS NOT NUMBER ...............")
            return;
        }
    }
    for (i = 0; i < amount.length; i++) {
        if (isNaN(amount[i])) {
            alert("WRONG AMOUNTS, IT IS NOT NUMBER ...............")
            return;
        }
    }
    web3.personal.unlockAccount(executefrom, password);

    for (i = 0; i < newproduct.length; i++) {
        var a = [];
        a.push(newproduct[i]);
        var b = [];
        b.push(unit[i]);
        var c = [];
        c.push(amount[i]);
        var d = [];
        d.push(ratio[i]);
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        web3.eth.contract(abiProduct).at(product).addAction.sendTransaction(a, b, c, d, {
            from: executefrom,
            gas: "0x0" + (4000000).toString(16)
        });
    }
}