window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct).at(db_contract);

    var address = document.getElementById('address').value;
    console.log(address);

    for (i = 0; i < dbContract.getCountAccount(); i++) {
      if (dbContract.getAccount.call(i)[0] == address) {

        document.getElementById("companyname").innerHTML += "Company: " + web3.toUtf8(dbContract.getAccount.call(i)[1]);
        document.getElementById("companyaddress").innerHTML += web3.toUtf8(dbContract.getAccount.call(i)[2]);
        document.getElementById("phonenumber").innerHTML += web3.toUtf8(dbContract.getAccount.call(i)[4]);
        document.getElementById("email").innerHTML += web3.toUtf8(dbContract.getAccount.call(i)[5]);

        var check = document.getElementById("checkraw");
        if (dbContract.checkAccount.call(address) == 1) {
          $("#checkraw").append(`
                <span style='color: green;' class='glyphicon glyphicon-ok'></span>
            `); 
        } else {
          $("#checkraw").append(`
                <input type='checkbox' disabled>
            `); 
          
        }

      }

    }

    var countproduct = dbContract.getCountProductOfOwner.call(address).toNumber();

    var data = [];

    for (i = 0; i < countproduct; i++) {
      var s = dbContract.getProductOfOwnerByAddress.call(address, i)
      data.push(s);

    }
    console.log(data);

    var res = "";

    var auc = [];
    auc[0] = ["STT", "Name", "Product"];

    res = "<table border=1 id=\"listAccountInfo\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
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
      res = res + "<td>" + web3.toUtf8(web3.eth.contract(abiProduct).at(data[j]).name.call().toString()).toUpperCase()+ "</td>";
      res = res + "<td><a href='/" + data[j] + "'>" + data[j] + "</a></td>";
      res = res + "</tr>";
    }

    res += "</tbody><tfoot></tfoot></table>";

    document.getElementById("tableAccountInfo").innerHTML = res;
    document.getElementById("tableAccountInfo").innerHTML = document.getElementById("tableAccountInfo").innerHTML.replace(/&/g, "");
    document.getElementById("tableAccountInfo").innerHTML = document.getElementById("tableAccountInfo").innerHTML.replace(/amp;#92;/g, "\\");
    document.getElementById("tableAccountInfo").innerHTML = document.getElementById("tableAccountInfo").innerHTML.replace(/amp;/g, "&");
    document.getElementById("tableAccountInfo").innerHTML = document.getElementById("tableAccountInfo").innerHTML.replace(/lt;/g, "<");
    document.getElementById("tableAccountInfo").innerHTML = document.getElementById("tableAccountInfo").innerHTML.replace(/gt;/g, ">");

    console.log("Refreshing product!");

    $(document).ready(function() {
      //createtable();
      $('#listAccountInfo').DataTable({
        "lengthMenu": [
          [5, 20, 50, -1],
          [5, 20, 50, "All"]
        ]
      });
    });
  });
}