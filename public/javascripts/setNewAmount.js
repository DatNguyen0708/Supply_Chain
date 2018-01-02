window.onload = function () {
        var account = document.getElementById('account').value;
        var product = document.getElementById('add').value;
}
function submit() {
            var amount = document.getElementById('amount').value;
            var executefrom = document.getElementById('executefrom').value.toString();
            var password = document.getElementById('password').value;
            web3.personal.unlockAccount(executefrom, password);
            web3.eth.contract(abiProduct).at(product).setNewAmount.sendTransaction( amount, {
                from: executefrom,
                gas: "0x0" + (4000000).toString(16)
            });
        }
