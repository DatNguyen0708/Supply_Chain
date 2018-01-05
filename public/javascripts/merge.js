window.onload = function () {
  getContractAddress(function (db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var account = document.getElementById('account').value;

    var addfirstproduct = document.getElementById('add').value;
    var countproduct = dbContract.getCountProductOfOwner.call(account).toNumber();

    var data = [];

    for (i = 0; i < countproduct; i++) {
      var s = dbContract.getProductOfOwnerByAddress.call(account, i);

      if (web3.eth.contract(abiProduct).at(s.toString()).getAmount.call().toNumber() > 0) {
        data.push(s);
      }
    }

    for (n = 0; n < data.length; n++) {
      if (data[n] != addfirstproduct) {
        $("#comboboxProduct").append(`
            <option>${data[n]}</option>
            `)
      }
    }
  });
}
function validateamount(amount) {
  var numval = amount.value
  curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={}();:'@#~,.Š\/<>?|`¬\]\[]| |/g, '');
  amount.value = curphonevar;
  amount.focus;
}

function submit() {
  var addfirstproduct = document.getElementById('add').value;
  var comboboxProduct = $("#comboboxProduct").val();

  var newproduct = web3.toHex(document.getElementById('newproduct').value);
  var a = document.getElementById('ratio').value;
  ratio = a.split(",");
  var amount = document.getElementById('amount').value;
  var unit = web3.toHex(document.getElementById('unit').value);
  var executefrom = document.getElementById('x').value.toString();
  var executefrom = executefrom.replace(/"/g, "'");
  var password = document.getElementById('password').value;
  if (newproduct == "" || a == "" || amount == "" || unit == "") {
    alert("Please enter blank input")
    return;
  }
  if (ratio.length - 1 != comboboxProduct.length) {
    alert("Wrong Ratio...............");
    return
  };
  for (i = 0; i < ratio.length; i++) {
    if (isNaN(ratio[i])) {
      alert("Wrong Ratio, It Must Be Number ...............")
      return;
    }
  }

  var checkPass = checkPassword(executefrom, password);

  if (checkPass == false) { alert("WRONG PASSWORD"); return; }

  web3.eth.contract(abiProduct).at(addfirstproduct).merge.sendTransaction(comboboxProduct, newproduct, ratio, amount, unit, {
    from: executefrom,
    gas: 4000000
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