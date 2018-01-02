
  window.onload = function () {
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
  }
    
  function view() {
    
    $("#productOfOwner").text("");
    var executefrom = document.getElementById("comboboxAccount").value;
    var countproduct = web3.eth.contract(abiDatabase).at(db_contract).getCountProductOfOwner.call(executefrom).toNumber();

    var data = [];

    for (i = 0; i < countproduct; i++) {
      var s = web3.eth.contract(abiDatabase).at(db_contract).getProductOfOwnerByAddress.call(executefrom, i)
      data.push(s);

    }
    console.log(data);

    for (i = 0; i < data.length; i++) {
      $("#productOfOwner").append(`
        <tr>
          <td>${i}</td>
          <td> <a href="/${data[i]}">${data[i]}</a></td>
          <td><a href="/merge/${data[i]}/${executefrom}" class="btn btn-primary">Merge</a><a href="/addaction/${data[i]}/${executefrom}" class="btn btn-info" style= "margin-left:5px;">Add Action</a><a href="/tranferOwner/${data[i]}" class="btn btn-danger" style= "margin-left:5px;">Tranfer Owner</a><a href="/setamount/${data[i]}" class="btn btn-success" id= "${i}" style= "margin-left:5px;">Set Amount</a></td>
        </tr>
      `);

      if (web3.eth.contract(abiProduct).at(data[i]).getCountParent.call().toNumber() != 0) {
        $("#"+i).hide();       
      }

    }

  }