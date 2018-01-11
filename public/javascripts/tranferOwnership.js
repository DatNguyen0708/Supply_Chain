 window.onload = function() {
     getContractAddress(function(db_contract, error) {
         if (error != null) {
             console.log(error);
             throw "Cannot load contract address";
         }
         dbContract = web3.eth.contract(abiDatabase).at(db_contract);
         var account = document.getElementById('account').value;
         console.log(account);
         var product = document.getElementById('add').value;
         console.log(product);
         var namePro = document.getElementById("namePro");
         document.getElementById("currentamount").innerHTML = web3.eth.contract(abiProduct).at(product).amount.call().toNumber();

         console.log(web3.toUtf8(web3.eth.contract(abiProduct).at(product).name.call().toString()));
         namePro.innerHTML = web3.toUtf8(web3.eth.contract(abiProduct).at(product).name.call().toString()).toUpperCase();
         var a = web3.eth.accounts;
         console.log(a);
         for (n = 0; n < a.length; n++) {
             if (account != a[n]) {
                 $("#comboboxAccount").append(`
              <option>${a[n]}</option>
              `)
             }
         }

     });
 }

 function submit() {
     var product = document.getElementById('add').value;
     var amount = document.getElementById('amount').value;
     var to = document.getElementById('comboboxAccount').value;
     var executefrom = document.getElementById('x').value.toString();
     var password = document.getElementById('password').value;

     var sum = web3.eth.contract(abiProduct).at(product).getAmount.call().toNumber();
     console.log(sum);
     console.log(amount);
     console.log(to);
     console.log(executefrom);
     console.log(product);
     console.log(typeof product);


     if (amount == "") {
         alert("Please enter amount");
         return;
     }
     if (sum < amount) {
         alert("Amount not enough");
         return;
     }

     if (dbContract.checkAccount.call(to).toString() == 2) {
         alert("Account not valid");
         return;
     }

     var checkExp = checkExpire(product);

     if (checkExp == false) {
         alert("Product was expire!");
         return;
     }

     var checkPass = checkPassword(executefrom, password);

     if (checkPass == false) {
         alert("Wrong Password");
         return;
     }

     document.getElementById("Button").disabled = true;

     web3.eth.contract(abiProduct).at(product).transferOwnership.sendTransaction(to, amount, {
         from: executefrom,
         gas: "0x0" + (4000000).toString(16)
     }, function(error, result) {
         if (!error) {

             while (1) {
                 if (web3.eth.getTransactionReceipt(result) != null) {
                     if (web3.eth.getTransactionReceipt(result).status == "0x1") {
                         alert("You tranfer amount success");
                         location.replace("/" + product);
                     }
                     break;
                 }
             }
         } else {
             if (error != null) {
                 alert(error);
                 return;
             }
             console.error(error);
         }
     });


 }