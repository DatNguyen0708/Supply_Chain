window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
     

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var executefrom = dbContract.ownerDB.call().toString();
    var id = document.getElementById('idx').value;
    console.log(id);
    console.log(executefrom);

    var account = dbContract.getAccount.call(id);
    console.log(account[3]);
    $("#account").val(account[0]);
    $("#name").val(web3.toUtf8(account[1]));
    $("#description").val(web3.toUtf8(account[2]));
    $("#checkraw").prop("checked", account[3]);
    $("#x").val(executefrom);
  });
}
function submit(){

    var account = document.getElementById('account').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var executefrom = document.getElementById('x').value;
    var checkraw = document.getElementById("checkraw").checked;
    console.log(checkraw);
    var pass = document.getElementById('password').value;
   var checkpass=checkPassword(executefrom, pass);

    if(checkpass == false) { 
       alert("WRONG PASSWORD"); return; 
    } 
   if ((name == "") || (description == "")){
      alert("Invalid Data");
      return;
   }else{
      document.getElementById("Button").disabled = true;
      dbContract.editAccount.sendTransaction(account, name, description, checkraw, {
      from: executefrom,
      gas: 4000000
    }, function (error, result) {
      if (!error) {
        while (1) {
          if (web3.eth.getTransactionReceipt(result) != null) {
            if (web3.eth.getTransactionReceipt(result).status == "0x1") {
              alert("You edit account information success!");
              location.replace("/admintrator/listAccount"); 
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
  
  //location.replace("/admintrator/listAccount");  
}