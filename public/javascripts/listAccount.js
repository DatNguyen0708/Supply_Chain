window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
      $("#content").append(`
        <div id="tableListAccount" style="margin-left:0%; margin-right:0%;"></div>
       
    `);

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    
    var countAccount = dbContract.getCountAccount.call().toNumber();

    var data = [];

    for (i = 0; i < countAccount; i++) {
      var s = dbContract.getAddressAccount.call(i);
      data.push(s);

    }
    console.log(data);

    var res = "";

    var auc = [];
    auc[0] = ["STT", "Product", "Action"];

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
      res = res + "<td><a href='/"+ data[j] + "'>" + data[j] + "</a></td>";
      if (dbContract.checkAccountRaw.call(data[j]) == false){
        res = res + "<td><a href='/addAccountRaw/" + data[j]  + "' class='btn btn-primary' id = '"+j+"'>Access create new raw product</a></td>";
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