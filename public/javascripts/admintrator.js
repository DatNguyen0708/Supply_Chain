window.onload = function() {

    getContractAddress(function(db_contract, error) {
      if (error != null) {
        //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
        console.log(error);
        throw "Cannot load contract address";
      }
  
      dbContract = web3.eth.contract(abiDatabase).at(db_contract);
  
      productContract = web3.eth.contract(abiProduct).at(db_contract);
  
      //$("#create_new_raw_product").hide();
  
  
      var accounts = [];
      accounts = web3.eth.accounts;
      console.log(accounts);
      //var accountCheck = document.getElementById("comboboxAccountAdd").value;
      
      var listOfAccountAdmin = document.getElementById("comboboxAccountAdmin");
  
      for (var i = 0; i < accounts.length; i++) {
        var option = document.createElement("option");
        if (i == 0) {
          option.text = "Main Account ";
          option.value = accounts[i];
        } else {
          option.text = "Account " + (i + 1);
          option.value = accounts[i];
        }
        listOfAccountAdmin.add(option);
      }
      //document.getElementById("account").value = accountCheck;
      });
  }
  function check(){
      var accountCheck = document.getElementById("comboboxAccountAdmin").value;
      console.log(typeof(accountCheck));
      console.log(accountCheck);
      var password = document.getElementById("password").value;
      console.log(password);

      //var checkpass = checkPassword(accountCheck, passwordAdd);

      var checkpass=checkPassword(accountCheck, password);

      if(checkpass == false) {  alert("WRONG PASSWORD"); return; } 

      console.log(dbContract.ownerDB.call());
      if (dbContract.ownerDB.call() == accountCheck) {


        setCookie("admin",accountCheck, 1);


        location.replace("/admintrator/index");
      }
      else{
        alert("Your account does not have access to this action");
      }
  }
