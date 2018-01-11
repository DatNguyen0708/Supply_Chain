window.onload = function() {
    var product = document.getElementById('add').value;
    var namePro = document.getElementById("namePro");

    console.log(web3.toUtf8(web3.eth.contract(abiProduct).at(product).name.call().toString()));
    namePro.innerHTML = web3.toUtf8(web3.eth.contract(abiProduct).at(product).name.call().toString()).toUpperCase();
    //hideSpinner();
}

function submit() {

    var account = document.getElementById('account').value;
    var product = document.getElementById('add').value;

    var newproduct = document.getElementById('newproduct').value;
    var unit = document.getElementById('unit').value;
    var amount = document.getElementById('amount').value;
    var ratio = document.getElementById('ratio').value;

    var expirydate = toTimestamp(document.getElementById("expirydate").value);
    var executefrom = document.getElementById('x').value.toString();
    var password = document.getElementById('password').value;

    var amountPro = web3.eth.contract(abiProduct).at(product).amount.call().toString();
    console.log(amountPro);

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

    console.log(amount*ratio);

    if(amountPro < amount*ratio) {
        alert("Amount not enough!");
        return;
    }

    if (newproduct == "" || unit == "" || amount == "" || ratio == "" || expirydate == "") {
        alert("Please enter blank input")
        return
    }
    if (toTimestamp(document.getElementById("expirydate").value) <= Date.now() / 1000) {
        alert("Please enter valid date")
        return

    }

    var checkPass = checkPassword(executefrom, password);

    if (checkPass == false) {
        alert("WRONG PASSWORD");
        return;
    }


    document.getElementById("Button").disabled = true;


    var a = web3.eth.contract(abiProduct).at(product).derive.sendTransaction(newproduct, unit, amount, ratio, expirydate, {
            from: executefrom,
            gas: "0x0" + (4000000).toString(16)
        },

        function(error, result) {
            if (!error) {

                while (1) {
                    if (web3.eth.getTransactionReceipt(result) != null) {
                        //hideSpinner();
                        if (web3.eth.getTransactionReceipt(result).status == "0x1") {
                            alert('You are add derive success');
                            var event = web3.eth.contract(abiProduct).at(product).ActionDerive({executefrom});
                            event.watch(function(err, msg) {
                                if (!err) {
                                    console.log(msg);
                                    console.log(msg.args.derive);
                                    location.replace("/" + msg.args.derive);
                                }
                            });
                        }
                        break;
                    }
                }
            } else {
                if (error != null) {
                    console.log(error);
                    alert('You are add derive not success');
                    return;
                }
                console.error(error);
            }
        });

}