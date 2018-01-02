
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

  //$("#productOfOwner").text("");
  var executefrom = document.getElementById("comboboxAccount").value;
  var countproduct = dbContract.getCountProductOfOwner.call(executefrom).toNumber();

  var data = [];

  for (i = 0; i < countproduct; i++) {
    var s = dbContract.getProductOfOwnerByAddress.call(executefrom, i)
    data.push(s);

  }
  console.log(data);


  var res = "";

  var auc = [];
  auc[0] = ["ID", "Product", "Action"];

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
    res = res + "<td><a href='/" + data[j] + "'>" + data[j] + "</a></td>";
    res = res + "<td><a href='/merge/"+ data[j]+"/executefrom' class='btn btn-primary'>Merge</a><a href='/addaction/"+data[j]+"' class='btn btn-info' style= 'margin-left:5px;'>Add Action</a><a href='/tranferOwner/"+ data[i]+ "' class='btn btn-danger' style= 'margin-left:5px;'>Tranfer Owner</a><a href='/setamount/"+ data[i]+"' class='btn btn-success' id= '" + j + "' style= 'margin-left:5px;'>Set Amount</a></td>";
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
    if (web3.eth.contract(abiProduct).at(data[j]).getCountParent.call().toNumber() != 0) {
      $('#' + j).hide();
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



  // for (i = 0; i < data.length; i++) {
  //   $("#productOfOwner").append(`
  //   <tr>
  //     <td>${i}</td>
  //     <td> <a href="/${data[i]}">${data[i]}</a></td>
  //     <td><a href="/merge/${data[i]}/${executefrom}" class="btn btn-primary">Merge</a><a href="/addaction/${data[i]}" class="btn btn-info" style= "margin-left:5px;">Add Action</a><a href="/tranferOwner/${data[i]}" class="btn btn-danger" style= "margin-left:5px;">Tranfer Owner</a><a href="/setamount/${data[i]}" class="btn btn-success" id= "${i}" style= "margin-left:5px;">Set Amount</a></td>
  //   </tr>
  // `);

  //   if (web3.eth.contract(abiProduct).at(data[i]).getCountParent.call().toNumber() != 0) {
  //     $("#" + i).hide();
  //   }

  // }

}





  // window.onload = function () {
  //   var accounts = [];
  //   accounts = web3.eth.accounts;
  //   console.log(accounts);

  //   var listOfAccount = document.getElementById("comboboxAccount");

  //   for (var i = 0; i < accounts.length; i++) {
  //     var option = document.createElement("option");
  //     if (i == 0) {
  //         option.text = "Main Account ";
  //         option.value = accounts[i];
  //     } else {
  //         option.text = "Account " + (i + 1);
  //         option.value = accounts[i];
  //     }
  //     listOfAccount.add(option);
  //   }   
  // }
    
  // function view() {
    
  //   $("#productOfOwner").text("");
  //   var executefrom = document.getElementById("comboboxAccount").value;
  //   var countproduct = web3.eth.contract(abiDatabase).at(db_contract).getCountProductOfOwner.call(executefrom).toNumber();

  //   var data = [];
  //   var am = [];
  //   for (i = 0; i < countproduct; i++) {
  //     var s = web3.eth.contract(abiDatabase).at(db_contract).getProductOfOwnerByAddress.call(executefrom, i)
  //     data.push(s);

  //   }
  //   console.log(data);

  //   for (i = 0; i < data.length; i++) {
  //     $("#productOfOwner").append(`
  //       <tr>
  //         <td>${i}</td>
  //         <td> <a href="/${data[i]}">${data[i]}</a></td>
  //         <td><a href="/merge/${data[i]}/${executefrom}" class="btn btn-primary" id="merge">Merge</a><a href="/addaction/${data[i]}/${executefrom}" class="btn btn-info" style= "margin-left:5px;" id="addaction">Add Action</a>
  //             <a href="/tranferOwnership/${data[i]}/${executefrom}" class="btn btn-danger" style= "margin-left:5px;" id="transferOwnership">Tranfer Ownership</a><a href="/setnewamount/${data[i]}/${executefrom}" class="btn btn-success" id= "${i}" style= "margin-left:5px;">Set Amount</a></td>
  //       </tr>
  //     `);
  //     console.log(data[i]);
  //     am[i] = web3.eth.contract(abiProduct).at(data[i]).getAmount.call().toNumber();
  //     console.log(am[i]);
  //     // if (am[i] == 0) {
  //     //   $("#merge").hide(); 
  //     //   $("#addaction").hide();
  //     //   $("#transferOwnership").hide();      
  //     // }
  //     if (web3.eth.contract(abiProduct).at(data[i]).getCountParent.call().toNumber() != 0) {
  //       $("#"+i).hide();       
  //     }

  //   }

  // }