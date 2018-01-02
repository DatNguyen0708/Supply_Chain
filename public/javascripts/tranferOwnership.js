    window.onload = function () {
        var account = document.getElementById('account').value;
        var product = document.getElementById('add').value;
        var a = web3.eth.accounts;
        for (n = 0; n < a.length; n++) {
            if(account!=a[n]){
            $("#comboboxAccount").append(`
              <option>${a[n]}</option>
              `)}
        }
    }
    function submit() {
        var amount = document.getElementById('amount').value;
        var to = document.getElementById('comboboxAccount').value;
        var executefrom = document.getElementById('x').value.toString();
        var password = document.getElementById('password').value;
        console.log( web3.eth.contract(abi0).at(product));
        var sum = web3.eth.contract(abi0).at(product).getAmount.call().toNumber();
        console.log(sum);
        if(sum<amount){
            alert("Amount not enough")
            return;
        }
        web3.personal.unlockAccount(executefrom, password);
        web3.eth.contract(abi0).at(product).transferOwnership.sendTransaction(to, amount, {
            from: executefrom,
            gas: "0x0" + (4000000).toString(16)
        });
    }
