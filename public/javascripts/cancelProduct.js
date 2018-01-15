window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
     

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct);

    //var executefrom = dbContract.ownerDB.call().toString();

    var address = document.getElementById('address').value;
    var account =document.getElementById('account').value;
    console.log(address);
    console.log(account);

    var countProduct = dbContract.getCountProduct.call().toNumber();
    for( i = 0; i <countProduct; i++){
      var pro = dbContract.getAddressProduct.call(i);
      if (pro == address){
        console.log(web3.toUtf8(productContract.at(pro).name.call().toString()).toUpperCase());
        console.log(productContract.at(pro).owner.call().toString());
        console.log(web3.toUtf8(productContract.at(pro).unit.call().toString()));
        console.log(productContract.at(pro).amount.call().toNumber());
        console.log(convertTimestamp(productContract.at(pro).expirydate.call()).toString());

        var product = document.getElementById("addressProduct");
        var name = document.getElementById("name");
        var owner = document.getElementById("owner");
        var unit = document.getElementById("unit");
        var amount = document.getElementById("amount");
        var expirydate = document.getElementById("expirydate");

        product.innerHTML = pro.toString();
        $("#x").val(account);

        name.innerHTML = web3.toUtf8(productContract.at(pro).name.call().toString()).toUpperCase()
        owner.innerHTML = productContract.at(pro).owner.call().toString()

        unit.innerHTML =web3.toUtf8(productContract.at(pro).unit.call().toString());

        amount.innerHTML = productContract.at(pro).amount.call().toNumber();
        expirydate.innerHTML = convertTimestamp(productContract.at(pro).expirydate.call()).toString();
        break;
      }
    }      
  });
}
function cancel(){
    var pro = document.getElementById('addressProduct').textContent;
    console.log(pro);
    var executefrom = document.getElementById('x').value;
    var pass = document.getElementById('password').value;
   var checkpass=checkPassword(executefrom, pass);

    if(checkpass == false) { 
       alert("WRONG PASSWORD"); return; 
    } 
    document.getElementById("Button").disabled = true;
    productContract.at(pro).cancel.sendTransaction({
    from: executefrom,
    gas: 4000000
  }, function (error, result) {
    if (!error) {

      while (1) {
        if (web3.eth.getTransactionReceipt(result) != null) {
          if (web3.eth.getTransactionReceipt(result).status == "0x1") {
            alert("You cancel product success!");
            location.replace("/admintrator/listProduct"); 
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
   
  
 // location.replace("/admintrator/listProduct");  
}