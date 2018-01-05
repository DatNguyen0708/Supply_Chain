window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
      $("#content").append(`
        <div id="contentAction"></div>
        
        </div>
        <div class="container" style="margin-top:4%">
        <div class="row">
            <div class="col-md-6" >
                  <h3  style="color: red;  margin-top:2%" align="center">List All of Account</h3>
                  <div id="tableListAccount"></div>
            </div>
            <div class="col-md-6">
                  <h3  style="color: red;  margin-top:2%" align="center">List all of Account access create new raw product </h3>
                  <div id="tableListAccountRaw"></div>
            </div>
            </div>
        </div>
       
    `);

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var executefrom = dbContract.ownerDB.call().toString();
    console.log(executefrom);
     $("#contentAction").append(`
       <div class="row test">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h1  style="color: red;  margin-top:2%" align="center">Access to create new raw product</h1>
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
              </div></div>
              <div class="col-md-2"></div>
      </div>
    `);

    var countAccount = dbContract.getCountAccount.call().toNumber();
    console.log(countAccount);

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
  

    var countAccountRaw = dbContract.getCountAccountRaw.call().toNumber();
    console.log(countAccountRaw);

    var dataRaw = [];

    for (i = 0; i < countAccountRaw; i++) {
      var s = dbContract.getAddressAccountRaw.call(i);
      dataRaw.push(s);

    }
    console.log(dataRaw);

    var res = "";

    var auc = [];
    auc[0] = ["STT", "Account"];

    res = "<table border=1 id=\"listAccountRaw\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
    res += "<thead>"

    res += "<tr>";
    for (var j = 0; j <= auc[0].length - 1; j++) {
      res += "<th>" + auc[0][j] + "</th>";
    }

    res += "</tr></thead><tbody>";

    for (var j = 0; j < dataRaw.length; j++) {
        
       
      var i = j+1;
      res = res + "<tr>";
      res = res + "<td>" + i + "</td>";
      res = res + "<td><a href='/accountInformation/"+ dataRaw[j] + "'>" + dataRaw[j] + "</a></td>";      
      res = res + "</tr>";
    }

    res += "</tbody><tfoot></tfoot></table>";

    document.getElementById("tableListAccountRaw").innerHTML = res;
    document.getElementById("tableListAccountRaw").innerHTML = document.getElementById("tableListAccountRaw").innerHTML.replace(/&/g, "");
    document.getElementById("tableListAccountRaw").innerHTML = document.getElementById("tableListAccountRaw").innerHTML.replace(/amp;#92;/g, "\\");
    document.getElementById("tableListAccountRaw").innerHTML = document.getElementById("tableListAccountRaw").innerHTML.replace(/amp;/g, "&");
    document.getElementById("tableListAccountRaw").innerHTML = document.getElementById("tableListAccountRaw").innerHTML.replace(/lt;/g, "<");
    document.getElementById("tableListAccountRaw").innerHTML = document.getElementById("tableListAccountRaw").innerHTML.replace(/gt;/g, ">");
    console.log("Refreshing product!");

    $(document).ready(function() {
      //createtable();
      $('#listAccountRaw').DataTable({
        "lengthMenu": [
          [5, 20, 50, -1],
          [5, 20, 50, "All"]
        ]
      });
    });

});
}

function access(){
    var accessAccount = document.getElementById('account').value;
    var executefrom = document.getElementById('x').value;
    var pass = document.getElementById('password').value;
    var checkpass=checkPassword(executefrom, pass);

    if(checkpass == false) { 
       alert("WRONG PASSWORD"); return; 
     } 
     if (dbContract.checkAccountRaw.call(accessAccount)== true){
        alert("This account has been granted permission to create!");
        return;
     }else{
        dbContract.AddlistAccountRaw.sendTransaction(accessAccount, {
      from: executefrom,
      gas: 4000000
    }); 
     }
    
    location.replace("/admintrator/listAccount");  
}