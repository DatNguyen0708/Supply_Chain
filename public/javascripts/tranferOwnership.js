 window.onload = function () {
        var account = document.getElementById('account').value;
        console.log(account);
        var product = document.getElementById('add').value;
        console.log(product);
        var amountRemain = document.getElementById("amountRemain");
        amountRemain.value = web3.eth.contract(abiProduct).at(product.toString()).getAmount.call().toNumber();
        console.log(amountRemain.value);
        $("#amountLimit").append(`
            <input type="number" name="amount" class="col-md-9 col-xs-12 form-control" id="amount" placeholder="Amount..." min="1" >
        `);
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
        var amountRemain = document.getElementById("amountRemain").value;
        console.log(amountRemain);
        console.log(amount);
        amount = parseInt(amount);
        amountRemain = parseInt(amountRemain);
        console.log(typeof(amount));
        if (amount > amountRemain) {
            console.log("kun cho");
            alert("The transfer amount is greater than the allowable amount");
        } 
        else{
            
            console.log("abc");

            var to = document.getElementById('comboboxAccount').value;
            var executefrom = document.getElementById('x').value.toString();
            var password = document.getElementById('password').value;
            console.log( web3.eth.contract(abiProduct).at(product.toString()));

            web3.personal.unlockAccount(executefrom, password);
            web3.eth.contract(abiProduct).at(product.toString()).transferOwnership.sendTransaction(to, amount, {
                from: executefrom,
                gas: "0x0" + (4000000).toString(16)
            });
        }
        
    }