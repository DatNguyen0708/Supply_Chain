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
    var dataname = [];
    for (i = 0; i < countproduct; i++) {
      var s = dbContract.getProductOfOwnerByAddress.call(account, i);


      if (web3.eth.contract(abiProduct).at(s.toString()).getAmount.call().toNumber() > 0) {
        data.push(s);
      }
    }
    for (i = 0; i < data.length; i++) {
      var a = web3.toUtf8(web3.eth.contract(abiProduct).at(data[i]).name.call().toString()).toUpperCase();
      dataname.push(a);
    }


    for (n = 0; n < data.length; n++) {

      $("#comboboxProduct").append(`
            <option value ="${data[n]}">${dataname[n]}:&nbsp;${data[n]}</option>
            `)
    }

  });
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
  var expirydate = toTimestamp(document.getElementById("expirydate").value);

  var password = document.getElementById('password').value;

  if (newproduct == "" || a == "" || amount == "" || unit == "" || expirydate == "") {
    alert("Please enter blank input")
    return;
  }
  if (ratio.length != comboboxProduct.length) {
    alert("WRONG RATIO...............");
    return;
  };
  for (i = 0; i < ratio.length; i++) {

    if (isNaN(ratio[i])) {
      alert("WRONG RATIO, IT MUST BE NUMBER ...............")
      return;

    }
  }

  console.log(comboboxProduct);
  for(i=0 ; i<ratio.length; i++) {
     if(amount*ratio[i] > web3.eth.contract(abiProduct).at(comboboxProduct[i]).amount.call().toNumber()) {
        alert("Not enough component!");
        return;
     }
  }
  if(toTimestamp(document.getElementById("expirydate").value)<=Date.now()/1000){
    alert("Please enter new date")
    return

  }


  console.log(web3.eth.contract(abiProduct).at(addfirstproduct));

  var checkPass = checkPassword(executefrom, password);

  if (checkPass == false) { alert("WRONG PASSWORD"); return; }

  document.getElementById("Button").disabled = true;

  web3.eth.contract(abiProduct).at(addfirstproduct).merge.sendTransaction(comboboxProduct, newproduct, ratio, amount, unit, expirydate, {
    from: executefrom,
    gas: 4000000
  }, function (error, result) {
    if (!error) {

      while (1) {
        if (web3.eth.getTransactionReceipt(result) != null) {
          if (web3.eth.getTransactionReceipt(result).status == "0x1") {
            // console.log(result)
            // console.log(web3.eth.getTransactionReceipt(result))
            alert("You merge product success");
            var event = web3.eth.contract(abiProduct).at(addfirstproduct).ActionMerge({});
            event.watch(function (err, msg) {
              if (!err){
                console.log(msg.args.merge);
              location.replace("/" + msg.args.merge);
              }
            });
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