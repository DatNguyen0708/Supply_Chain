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
                  <h1  style="color: red;  margin-top:2%; " align="center">List All of Account</h1>
                  <div id="tableListAccount" style="margin-left: 5%; margin-right: 5%;"></div>
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
            <h2  style="color: red;  margin-top:2%" align="center">Add Account</h2>
              <div class="form-group row">
                <label for="chooseaccount " class="col-md-3 col-xs-12 text-left">Choose Account</label>
                <input type="text" name="account" class="col-md-9 col-xs-12 form-control" id="account" placeholder="Account">
              </div>
              <div class="form-group row">
                <label for="name " class="col-md-3 col-xs-12 text-left">Name</label>
                <input type="text" name="name" class="col-md-9 col-xs-12 form-control" id="name" placeholder="Name">
              </div>
              <div class="form-group row">
                <label for="description " class="col-md-3 col-xs-12 text-left">Description</label>
                <input type="text" name="description" class="col-md-9 col-xs-12 form-control" id="description" placeholder="Description">
              </div>
              <div class="form-group row">
                <label for="phonenumber " class="col-md-3 col-xs-12 text-left">Phone Number</label>
                <input type="text" name="phonenumber" class="col-md-9 col-xs-12 form-control" id="phonenumber" placeholder="Phone Number">
              </div>
              <div class="form-group row">
                <label for="email " class="col-md-3 col-xs-12 text-left">Email</label>
                <input type="email" name="email" class="col-md-9 col-xs-12 form-control" id="email" placeholder="Email">
              </div>
              <div class="form-group row">
                <label for="checkraw" class="col-md-3 col-xs-12 text-left">Check Raw</label>
                <input type="checkbox" value="" id="checkraw"></label>
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
                <button type="submit " class="col-md-2 col-xs-12 btn btn-primary " id="Button" onclick="add();">Add</button>
                <label class="col-md-5 col-xs-12 text-left"></label>
              </div>
            </div>
          <div class="col-md-2"></div>
      </div>
    `);

    var countAccount = dbContract.getCountAccount.call().toNumber();
    console.log(countAccount);

    var data = [];

    for (i = 0; i < countAccount; i++) {
      var s = dbContract.getAccount.call(i);
      data.push(s);

    }
    console.log(data);

    var res = "";

    var auc = [];

    auc[0] = ["STT", "Address","Name", "Description","Phone Number","Email","Be Accessed", "Edit"];

    res = "<table border=1 id=\"listAccount\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
    res += "<thead>"

    res += "<tr>";
    for (var j = 0; j <= auc[0].length - 1; j++) {
      res += "<th>" + auc[0][j] + "</th>";
    }

    res += "</tr></thead><tbody>";

    for (var j = 0; j < data.length; j++) {
      var datainfo = data[j];
       console.log(datainfo[0]);
      var i = j+1;
      res = res + "<tr>";
      res = res + "<td>" + i + "</td>";
      res = res + "<td><a href='/accountInformation/"+ datainfo[0] + "'>" + datainfo[0] + "</a></td>";
      res = res + "<td>" + web3.toUtf8(datainfo[1]) + "</td>";
      res = res + "<td>" + web3.toUtf8(datainfo[2]) + "</td>";
      res = res + "<td>" + web3.toUtf8(datainfo[4]) + "</td>";
      res = res + "<td>" + web3.toUtf8(datainfo[5]) + "</td>";
      if (dbContract.checkAccount.call(datainfo[0]) == 1){
        res = res + "<td><span style='color: green;' class='glyphicon glyphicon-ok'></span></td>";
      }
      else{
        res = res + "<td><input type='checkbox' disabled></td>";
      }
      res = res + "<td><a href='/edit/" + j + "' class='btn btn-primary' >Edit</a></td>";
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

function add(){

    var accessAccount = document.getElementById('account').value;    
    var name = web3.toHex(document.getElementById('name').value);
    var description = web3.toHex(document.getElementById('description').value);
    var executefrom = document.getElementById('x').value;
    var phonenumber = toHex(document.getElementById('phonenumber').value);
    phonenumber = "0x"+phonenumber;
    console.log(typeof phonenumber);
    console.log(phonenumber);
    var email = web3.toHex(document.getElementById('email').value);
    var checkraw = document.getElementById("checkraw").checked;
    var pass = document.getElementById('password').value;
    var checkpass=checkPassword(executefrom, pass);

     if ((name == "") || (description == "") || (accessAccount == "") || (phonenumber == "") || (email == "") ){
      alert("Please enter full data");
      return;
   }
   if (web3.isAddress(accessAccount.toString()) == false){
      alert("Address invalid!");
      return;
    }
    if(checkpass == false) { 
       alert("WRONG PASSWORD"); return; 
    } 
   if (dbContract.checkAccount.call(accessAccount)== 1){
      alert("This account has been granted permission to create!");
      return;
   }else{

    document.getElementById("Button").disabled = true;
      dbContract.AddlistAccount.sendTransaction(accessAccount, name, description, checkraw, phonenumber, email, {
    from: executefrom,
    gas: 4000000
  }, function (error, result) {
    if (!error) {

      while (1) {
        if (web3.eth.getTransactionReceipt(result) != null) {
          if (web3.eth.getTransactionReceipt(result).status == "0x1") {
            alert("You add account success!");
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
  
 // location.replace("/admintrator/listAccount");  
}