function validateamount(amount) {
    var numval = amount.value
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={}();:'@#~,.Š\/<>?|`¬\]\[]| |/g, '');
    amount.value = curphonevar;
    amount.focus;
}
function validateratio(amount) {
    var numval = ratio.value
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={}();:'@#~,.Š\/<>?|`¬\]\[]| |/g, '');
    ratio.value = curphonevar;
    ratio.focus;
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
    if (newproduct == "" || unit == "") {
        alert("Please enter blank input")
        return
    }


    var checkPass = checkPassword(executefrom, password);

    if (checkPass == false) { alert("WRONG PASSWORD"); return; }

    web3.eth.contract(abiProduct).at(product).derive.sendTransaction(newproduct, unit, amount, ratio, {
        from: executefrom,
        gas: "0x0" + (4000000).toString(16)
    }, function (error, result) {
        if (!error) {

            while (1) {
                if (web3.eth.getTransactionReceipt(result) != null) {
                    if (web3.eth.getTransactionReceipt(result).status == "0x1") {
                        alert("You set amount success");
                        location.replace("/" + product);
                    }
                    break;
                }
            }
        }
        else {
            if (error != null) {
                alert(error);
                return;
            }
            console.error(error);
        }
    });

}