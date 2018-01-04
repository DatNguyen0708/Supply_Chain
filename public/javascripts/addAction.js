function submit() {

    var account = document.getElementById('account').value;
    console.log(account);
    var product = document.getElementById('add').value;
    console.log(product);
    var newproduct = document.getElementById('newproduct').value;
    console.log(newproduct);
    var unit = document.getElementById('unit').value;
    console.log(unit);
    var amount = document.getElementById('amount').value;
    console.log(amount);
    var ratio = document.getElementById('ratio').value;
    console.log(ratio);
    var executefrom = document.getElementById('x').value.toString();
    console.log(executefrom);
    var password = document.getElementById('password').value;
    console.log(password);
    if (isNaN(ratio)) {
            alert("WRONG RATIO, IT IS NOT NUMBER ...............")
            return;
        }
    if (isNaN(amount)) {
        alert("WRONG AMOUNTS, IT IS NOT NUMBER ...............")
        return;
    }
    
    web3.personal.unlockAccount(executefrom, password);
    web3.eth.contract(abiProduct).at(product).derive.sendTransaction(newproduct, unit, amount, ratio, {
        from: executefrom,
        gas: "0x0" + (4000000).toString(16)
    });
    
}