window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
      $("#content").append(`
        <h1  style="color: red;  margin-top:2%" align="center">List of Product</h1>
        <div id="tableListAccount" style="margin-left:5%; margin-right:5%;">
        </div>
       
    `);

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var executefrom = dbContract.ownerDB.call().toString();
    console.log(executefrom);
     $("#contentAction").append(`
       <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8 test"> 
            <h1  style="color: red;" align="center">Access to create new raw product</h1>
              <div class="form-group row">
                <label for="chooseaccount " class="col-md-3 col-xs-12 text-left">Choose Account</label>
                <input type="text" name="account" class="col-md-9 col-xs-12 form-control" id="account" placeholder="Account">
              </div>
              <div class="form-group row">
                <label for="executefrom" class="col-md-3 col-xs-12 text-left">Execute From</label>
                <input type="text" name="executefrom" class="col-md-9 col-xs-12 form-control" id="x" value="${executefrom}" disabled>
              </div>
              <div class="form-group row">
                <label for="password" class="col-md-3 col-xs-12 text-left">Password</label>
                <input type="password" name="password" class="col-md-9 col-xs-12 form-control" id="password" placeholder="Password">
              </div>
              <div class="form-group row">
                <label class="col-md-5 col-xs-12 text-left"></label>
                <button type="submit " class="col-md-2 col-xs-12 btn btn-primary " onclick="access();">Access</button>
                <label class="col-md-5 col-xs-12 text-left"></label>
              </div>
              </div>
          <div class="col-md-2"></div>
      </div>
    `);

    var countAccount = dbContract.getCountAccount.call().toNumber();

    var data = [];

    for (i = 0; i < countAccount; i++) {
      var s = dbContract.getAddressAccount.call(i);
      data.push(s);

    }
    console.log(data);

    var res = "";

    var auc = [];
    auc[0] = ["STT", "Account","Be Accessed"];

    res = "<table border=1 id=\"listAccount\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
    res += "<thead>"

    res += "<tr>";
    for (var j = 0; j <= auc[0].length - 1; j++) {
      res += "<th>" + auc[0][j] + "</th>";
    }

    res += "</tr></thead><tbody>";

    for (var j = 0; j < data.length; j++) {
        
       
      var i = j+1;
      res = res + "<tr>";
      res = res + "<td>" + i + "</td>";
      res = res + "<td><a href='/accountInformation/"+ data[j] + "'>" + data[j] + "</a></td>";
      if (dbContract.checkAccountRaw.call(data[j]) == true){
        res = res + "<td><span style='color: green;' class='glyphicon glyphicon-ok'></span></td>";
      }
      else{
        res = res + "<td><input type='checkbox' disabled></td>";
      }
      
      res = res + "</tr>";
    }

    res += "</tbody><tfoot></tfoot></table>";

    document.getElementById("tableListAccount").innerHTML = res;
    document.getElementById("tableListAccount").innerHTML = document.getElementById("tableListAccount").innerHTML.replace(/&/g, "");
    document.getElementById("tableListAccount").innerHTML = document.getElementById("tableListAccount").innerHTML.replace(/amp;#92;/g, "\\");
    document.getElementById("tableListAccount").innerHTML = document.getElementById("tableListAccount").innerHTML.replace(/amp;/g, "&");
    document.getElementById("tableListAccount").innerHTML = document.getElementById("tableListAccount").innerHTML.replace(/lt;/g, "<");
    document.getElementById("tableListAccount").innerHTML = document.getElementById("tableListAccount").innerHTML.replace(/gt;/g, ">");
    console.log("Refreshing product!");
    

    $(document).ready(function() {
      //createtable();
      $('#listAccount').DataTable({
        "lengthMenu": [
          [5, 20, 50, -1],
          [5, 20, 50, "All"]
        ]
      });
    });
  });

 



}

function addAccountRaw(_account){
    var accessAccount = document.getElementById('account').value;
    var executefrom = document.getElementById('x').value;
    web3.personal.unlockAccount(executefrom, '123456789');
    dbContract.AddlistAccount.sendTransaction(accessAccount, {
      from: executefrom,
      gas: 4000000
    }); 
    location.replace("/admintrator/listAccount");  
}