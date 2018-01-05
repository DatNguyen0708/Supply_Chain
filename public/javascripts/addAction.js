window.onload = function() {
    hideSpinner();
}
function submit() { 

    var account = document.getElementById('account').value;
    var product = document.getElementById('add').value;

    var newproduct = document.getElementById('newproduct').value;
    var unit = document.getElementById('unit').value;
    var amount = document.getElementById('amount').value;
    var ratio = document.getElementById('ratio').value;
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

    var checkPass = checkPassword(executefrom, password);

    if (checkPass == false) {
        alert("WRONG PASSWORD");
        return;
    }


    document.getElementById("Button").disabled = true;

    showSpinner();

    var a = web3.eth.contract(abiProduct).at(product).derive.sendTransaction(newproduct, unit, amount, ratio, {
            from: executefrom,
            gas: "0x0" + (4000000).toString(16)
        },

        function(error, result) {
            if (!error) {
                console.log(result);
                console.log(web3.eth.getTransactionReceipt(result));

                while (1) {
                    if (web3.eth.getTransactionReceipt(result) != null) {
                        hideSpinner();
                        if (web3.eth.getTransactionReceipt(result).status == "0x1") {
                            alert('You are add derive success');
                            location.replace("/index#all_product");
                            //location.replace("/" + product);
                        }
                        break;
                    }
                }
            } else {
                if (error != null) {
                    console.log(error);
                    alert('You are add derive success');
                    return;
                }
                console.error(error);
            }
        });
}