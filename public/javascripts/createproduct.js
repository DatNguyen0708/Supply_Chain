window.onload = function() {

  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    $("#create_new_raw_product").hide();

    var accounts = [];
    accounts = web3.eth.accounts;
    console.log(accounts);

    var listOfAccount = document.getElementById("comboboxAccountAdd");

    for (var i = 0; i < accounts.length; i++) {
      var option = document.createElement("option");
      if (i == 0) {
        option.text = "Main Account ";
        option.value = accounts[i];
      } else {
        option.text = "Account " + (i + 1);
        option.value = accounts[i];
      }
      listOfAccount.add(option);
    }
  });
}


function check() {
  var accountCheck = document.getElementById("comboboxAccountAdd").value;
  console.log(typeof(accountCheck));
  console.log(accountCheck);
  var passwordAdd = document.getElementById("passwordAdd").value;

  if(passwordAdd=="") {
    alert("Please input password");
    return;
  }
  console.log(passwordAdd);

  var checkpass = checkPassword(accountCheck, passwordAdd);

  if (checkpass == false) {
    alert("WRONG PASSWORD");
    return;
  }

  var checkRaw = dbContract.checkAccount.call(accountCheck).toNumber();
  if(checkRaw !=1){
    alert("Your account does not have access to this action");
  }
  else {
    $("#check_account").hide();
    $("#create_new_raw_product").show();
    document.getElementById("account").value = accountCheck;
  }
}

function submit() {

  //$("#productOfOwner").text("");
  var executefrom = document.getElementById("account").value;

  var _expirydate = document.getElementById("expirydate").value;
  var expirydate= toTimestamp(document.getElementById("expirydate").value)

  var _name = web3.toHex(document.getElementById("nameofproduct").value);
  var _unit = web3.toHex(document.getElementById("unit").value);
  var _amount = document.getElementById("amount").value;
  
  console.log(_name);
  console.log(_unit);

  var _DATABASE_CONTRACT = db_contract;
  if (_amount == "" || _name == "" || _unit == "" || _expirydate == ""||!isNaN(document.getElementById("nameofproduct").value) || !isNaN(document.getElementById("unit").value)) {
    alert("Please enter input again");
    return;
  }
  if(toTimestamp(document.getElementById("expirydate").value)<=Date.now()/1000){
    alert("Please enter new date");
    return

  }

  document.getElementById("Button").disabled = true;

  var productContract = web3.eth.contract(abiProduct);
  console.log(_name);
  var product = productContract.new(
    _name, [],
    _unit,
    _amount, [],
    executefrom,
    expirydate,
    _DATABASE_CONTRACT, {
      from: executefrom,
      data: bytecode,
      gas: '4700000'
    },
    function(e, contract) {
      console.log(e, contract);
      if (e != null) {
        alert(e);
      }

      if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        alert('You are deploy success');
        location.replace("/"+contract.address)

      }
    })
}