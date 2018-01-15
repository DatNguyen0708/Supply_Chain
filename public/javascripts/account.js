window.onload = function() {

  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    console.log(db_contract);
    console.log(web3.eth.contract(abiDatabase).at(db_contract).getCountProduct.call().toNumber());
    $("#pro_of_owner").hide();

    var accounts = [];
    accounts = web3.eth.accounts;
    console.log(accounts);

    var listOfAccount = document.getElementById("comboboxAccount");

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

function view() {

  var executefrom = document.getElementById("comboboxAccount").value;
  var countproduct = dbContract.getCountProductOfOwner.call(executefrom).toNumber();
  var password = document.getElementById('password').value;
  var checkpass=checkPassword(executefrom, password);

  if(checkpass == false) {  alert("WRONG PASSWORD"); return; }
   
  var data = [];

  for (i = 0; i < countproduct; i++) {

    var s = dbContract.getProductOfOwnerByAddress.call(executefrom, i);
  
    data.push(s);
  }
  if(data.length==0){ 
    alert("This account don't have product");
    return;
  }

  console.log(data);
  if( data.length !=0){

      $("#pro_of_owner").show();
      var res = "";

      var auc = [];
      auc[0] = ["ID", "Name of Product","Address of Product", "Action"];

      res = "<table border=1 id=\"listAccounts\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
      res += "<thead>"

      res += "<tr>";
      for (var j = 0; j <= auc[0].length - 1; j++) {
        res += "<th>" + auc[0][j] + "</th>";
      }

      res += "</tr></thead><tbody>";

      for (var j = 0; j < data.length; j++) {
        var i = j + 1;
        res = res + "<tr>";
        res = res + "<td>" + i + "</td>";
        res = res + "<td>" + web3.toUtf8(web3.eth.contract(abiProduct).at(data[j]).name.call().toString()).toUpperCase() + "</td>";
        res = res + "<td><a href='/" + data[j] + "'>" + data[j] + "</a></td>";
        //res = res + "<td><a href='/merge/" + data[j] + "/"+executefrom + "' class='btn btn-primary' id = 'merge"+i+"'>Merge</a><a href='/addaction/" + data[j] + "/"+executefrom+ "' class='btn btn-info' style= 'margin-left:5px;' id = 'addaction"+i+"'>Derive</a><a href='/tranferOwnership/" + data[j] + "/"+executefrom+ "' class='btn btn-danger' style= 'margin-left:5px;' id = 'ownership"+i+"'>Sell</a><a href='/setnewamount/" + data[j] + "/" +executefrom+ "' class='btn btn-success' id= '" + j + "' style= 'margin-left:5px;' >Edit Amount</a></td>";

        res = res + "<td><a href='/merge/" + data[j] + "/"+executefrom + "' class='btn btn-primary' id = 'merge"+i+"'>Merge</a><a href='/addaction/" + data[j] + "/"+executefrom+ "' class='btn btn-info' style= 'margin-left:5px;' id = 'addaction"+i+"'>Derive</a><a href='/tranferOwnership/" + data[j] + "/"+executefrom+ "' class='btn btn-danger' style= 'margin-left:5px;' id = 'ownership"+i+"'>Sell</a><a href='/setnewamount/" + data[j] + "/" +executefrom+ "' class='btn btn-success' id= '" + j + "' style= 'margin-left:5px;' >Edit Amount</a><a href='/cancelProduct/" + data[j] + "/" +executefrom+ "' class='btn btn-success' id= 'cancel" + j + "' style= 'margin-left:5px;' >Cancel</a></td>";

        res = res + "</tr>";
      }

      res += "</tbody><tfoot></tfoot></table>";


      document.getElementById("tableAccounts").innerHTML = res;
      document.getElementById("tableAccounts").innerHTML = document.getElementById("tableAccounts").innerHTML.replace(/&/g, "");
      document.getElementById("tableAccounts").innerHTML = document.getElementById("tableAccounts").innerHTML.replace(/amp;#92;/g, "\\");
      document.getElementById("tableAccounts").innerHTML = document.getElementById("tableAccounts").innerHTML.replace(/amp;/g, "&");
      document.getElementById("tableAccounts").innerHTML = document.getElementById("tableAccounts").innerHTML.replace(/lt;/g, "<");
      document.getElementById("tableAccounts").innerHTML = document.getElementById("tableAccounts").innerHTML.replace(/gt;/g, ">");

      console.log("Refreshing product!");


      for (var j = 0; j < data.length; j++) {
        var i=j+1;
        if(web3.eth.contract(abiProduct).at(data[j]).getAmount.call().toNumber() == 0){
          $('#merge' + i).hide();
          $("#addaction"+i).hide();
          $("#ownership"+i).hide();
          $("#cancel"+j).hide();
        }
        if ( ((web3.eth.contract(abiProduct).at(data[j]).getCountParent.call().toNumber() != 0) || ((web3.eth.contract(abiProduct).at(data[j]).getCountParent.call().toNumber() == 0)&&(web3.eth.contract(abiProduct).at(data[j]).amount.call().toNumber() != 0)))) {
          $('#' + j).hide();
        }
        if (web3.eth.contract(abiProduct).at(data[j]).expirydate.call().toNumber() <Date.now()/1000) {
          $('#' + j).attr('disabled','disabled');
          $('#merge' + i).attr('disabled','disabled');
          $("#addaction"+i).attr('disabled','disabled');
          $("#ownership"+i).attr('disabled','disabled');
          $("#cancel"+i).attr('disabled','disabled');
        }

      }

      $(document).ready(function() {
        //createtable();
        $('#listAccounts').DataTable({
          "lengthMenu": [
            [5, 20, 50, -1],
            [5, 20, 50, "All"]
          ]
        });
      });
    }

  
}