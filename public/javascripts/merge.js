  var account = document.getElementById('account').value;
  var addfirstproduct = document.getElementById('add').value;
  window.onload = function () {
  var countproduct = web3.eth.contract(abiDatabase).at(db_contract).getCountProductOfOwner.call(account).toNumber();

  var data = [];

  for (i = 0; i < countproduct; i++) {
    var s = web3.eth.contract(abiDatabase).at(db_contract).getProductOfOwnerByAddress.call(account, i);
    
    data.push(s);

  }

  for (n = 0; n < data.length; n++) {
    $("#comboboxProduct").append(`
            <option>${data[n]}</option>
            `)
  }
}
  function submit() {

    var comboboxProduct = $("#comboboxProduct").val();
    var newproduct = web3.toHex(document.getElementById('newproduct').value);
    var ratio = document.getElementById('ratio').value.toString();
    var amount = document.getElementById('amount').value;
    var unit = web3.toHex(document.getElementById('unit').value);
    var executefrom = document.getElementById('executefrom').value;
    var password = document.getElementById('password').value;
    // console.log(typeof arr  );
    console.log(typeof arr);
    console.log(web3.eth.contract(abi0).at(addfirstproduct));
    web3.personal.unlockAccount(executefrom, password);
    web3.eth.contract(abi0).at(addfirstproduct).merge.sendTransaction(comboboxProduct, newproduct, ratio, amount, unit, {
      from: executefrom,
      gas: 4000000
    });


  }
