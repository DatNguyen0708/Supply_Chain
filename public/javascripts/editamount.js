
window.onload = function () {
        var account = document.getElementById('account').value;
        var product = document.getElementById('add').value;
        var a= web3.toUtf8(web3.eth.contract(abiProduct).at(product).name.call().toString());
        document.getElementById('12').innerHTML = a;
    
}
function submit() {
    var amount = document.getElementById('addnewamount').value;
    var executefrom = document.getElementById('executefrom').value.toString();
    var password = document.getElementById('password').value;
    var product = document.getElementById('add').value;
    var checkPass = checkPassword(executefrom, password);

    if (checkPass == false) { alert("WRONG PASSWORD"); return; }
    document.getElementById("Button").disabled = true;
    web3.eth.contract(abiProduct).at(product).EditAmount.sendTransaction(amount, {
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