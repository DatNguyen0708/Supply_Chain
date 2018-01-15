window.onload = function() {
  getContractAddress(function(db_contract, error) {
    if (error != null) {
      //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
      console.log(error);
      throw "Cannot load contract address";
    }
    $("#content").append(`
      <h1  style="color: red; margin-top:5%;" align="center">List of Product</h1>
    <div id="tableListProduct" style="margin-left:5%; margin-right:5%;"></div>
     <div>  
      
    `);

    dbContract = web3.eth.contract(abiDatabase).at(db_contract);

    productContract = web3.eth.contract(abiProduct);

    //console.log(address);
    var countproducts = dbContract.getCountProduct.call().toNumber();

    var data = [];

    for (i = 0; i < countproducts; i++) {
      var s = dbContract.getAddressProduct.call( i)
      data.push(s);

    }
    console.log(data);

    var res = "";

    var auc = [];
    auc[0] = ["STT", "Product", "Action"];

    res = "<table border=1 id=\"listProduct\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";
    res += "<thead>"

    res += "<tr>";
    for (var j = 0; j <= auc[0].length - 1; j++) {
      res += "<th>" + auc[0][j] + "</th>";
    }

    res += "</tr></thead><tbody>";

    for (var j = 0; j < data.length; j++) {
      console.log(productContract.at(data[j]).amount.call().toNumber());
      var i = j+1;
      res = res + "<tr>";
      res = res + "<td>" + i + "</td>";
      res = res + "<td><a href='/"+ data[j] + "'>" + data[j] + "</a></td>";
      if ((productContract.at(data[j]).amount.call().toNumber()) > 0){
        res = res + "<td><a href='/cancel/" + j  + "' class='btn btn-primary' >Cancel</a></td>";
      }
      else {
        res = res + "<td><p style='color: red;'>Out of Stock</p></td>";
      }
      
      res = res + "</tr>";
    }

    res += "</tbody><tfoot></tfoot></table>";

    document.getElementById("tableListProduct").innerHTML = res;
    document.getElementById("tableListProduct").innerHTML = document.getElementById("tableListProduct").innerHTML.replace(/&/g, "");
    document.getElementById("tableListProduct").innerHTML = document.getElementById("tableListProduct").innerHTML.replace(/amp;#92;/g, "\\");
    document.getElementById("tableListProduct").innerHTML = document.getElementById("tableListProduct").innerHTML.replace(/amp;/g, "&");
    document.getElementById("tableListProduct").innerHTML = document.getElementById("tableListProduct").innerHTML.replace(/lt;/g, "<");
    document.getElementById("tableListProduct").innerHTML = document.getElementById("tableListProduct").innerHTML.replace(/gt;/g, ">");

    console.log("Refreshing product!");

    $(document).ready(function() {
      //createtable();
      $('#listProduct').DataTable({
        "lengthMenu": [
          [5, 20, 50, -1],
          [5, 20, 50, "All"]
        ]
      });
    });
  });
}