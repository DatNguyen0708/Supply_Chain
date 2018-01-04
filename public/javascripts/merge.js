window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var account = document.getElementById('account').value;
    console.log(account);
    var addfirstproduct = document.getElementById('add').value;
    var countproduct = dbContract.getCountProductOfOwner.call(account).toNumber();
    console.log(countproduct);
    var data = [];

    for (i = 0; i < countproduct; i++) {
      var s = dbContract.getProductOfOwnerByAddress.call(account, i);
      console.log(s);
      console.log(web3.eth.contract(abiProduct).at(s.toString()).getAmount.call().toNumber());
      if (web3.eth.contract(abiProduct).at(s.toString()).getAmount.call().toNumber() > 0) {
        data.push(s);
      }
    }

    for (n = 0; n < data.length; n++) {
      if (data[n] != addfirstproduct){
      $("#comboboxProduct").append(`
            <option>${data[n]}</option>
            `)
      }
    }
  });
}

function submit() {
    var addfirstproduct = document.getElementById('add').value;
    var comboboxProduct = $("#comboboxProduct").val();
    console.log(comboboxProduct);
    var newproduct = web3.toHex(document.getElementById('newproduct').value);
    var a = document.getElementById('ratio').value;
    ratio = a.split(",");
    var amount = document.getElementById('amount').value;
    var unit = web3.toHex(document.getElementById('unit').value);
    var executefrom = document.getElementById('x').value.toString();
    var executefrom = executefrom.replace(/"/g, "'");
    var password = document.getElementById('password').value;
    if(ratio.length-1 != comboboxProduct.length){
      alert("WRONG RATIO...............")
    };
    for(i=0;i<ratio.length;i++){

      if(isNaN(ratio[i])){
        alert("WRONG RATIO, IT MUST BE NUMBER ...............")
        return;

      }
    }
  console.log(web3.eth.contract(abiProduct).at(addfirstproduct));

  var checkPass = checkPassword(executefrom, password);

  if(checkPass == false) {  alert("WRONG PASSWORD"); return; } 

  web3.eth.contract(abiProduct).at(addfirstproduct).merge.sendTransaction(comboboxProduct, newproduct, ratio, amount, unit, {
    from: executefrom,
    gas: 4000000
  });
}