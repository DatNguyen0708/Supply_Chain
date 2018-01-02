 window.onload = function () {
        var account = document.getElementById('account').value;
        console.log(account);
        var product = document.getElementById('add').value;
        console.log(product);
        var a = web3.eth.accounts;
        console.log(a);
        for (n = 0; n < a.length; n++) {
            if(account!=a[n]){
            $("#comboboxAccount").append(`
              <option>${a[n]}</option>
              `)}
        }
    }
    function submit() {
        var product = document.getElementById('add').value;
        var amount = document.getElementById('amount').value;
        var to = document.getElementById('comboboxAccount').value;
        var executefrom = document.getElementById('x').value.toString();
        var password = document.getElementById('password').value;
        console.log( web3.eth.contract(abiProduct).at(product.toString()));
        var sum = web3.eth.contract(abiProduct).at(product.toString()).getAmount.call().toNumber();
        console.log(sum);
        if(sum<amount){
            alert("Amount not enough");
            return;
        }
        web3.personal.unlockAccount(executefrom, password);
        web3.eth.contract(abiProduct).at(product.toString()).transferOwnership.sendTransaction(to, amount, {
            from: executefrom,
            gas: "0x0" + (4000000).toString(16)
        });
    }