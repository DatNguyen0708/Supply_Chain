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

    var addfirstproduct = document.getElementById('add').value;
    var countproduct = dbContract.getCountProductOfOwner.call(account).toNumber();

    var data = [];
    var dataname=[];
    for (i = 0; i < countproduct; i++) {
      var s = dbContract.getProductOfOwnerByAddress.call(account, i);
     
     
      if (web3.eth.contract(abiProduct).at(s.toString()).getAmount.call().toNumber() > 0) {
        data.push(s);
      }
    }
    for(i=0;i<data.length;i++){
      var a= web3.toUtf8(web3.eth.contract(abiProduct).at(data[i]).name.call().toString());
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
    // var executefrom = executefrom.replace(/"/g, "'");
    var password = document.getElementById('password').value;

    if (newproduct == "" || a == "" || amount == "" || unit == "") {
      alert("Please enter blank input")
      return;
    }
    if(ratio.length-1 != comboboxProduct.length){
      alert("WRONG RATIO...............");
      return;
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

  document.getElementById("Button").disabled = true;

  web3.eth.contract(abiProduct).at(addfirstproduct).merge.sendTransaction(comboboxProduct, newproduct, ratio, amount, unit, {
    from: executefrom,
    gas: 4000000
  }, function (error, result) {
    if (!error) {

      while (1) {
        if (web3.eth.getTransactionReceipt(result) != null) {
          if (web3.eth.getTransactionReceipt(result).status == "0x1") {
            alert("You merge product success");
            location.replace("/" + addfirstproduct);
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