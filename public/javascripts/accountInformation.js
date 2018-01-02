
window.onload = function () {
    var address = document.getElementById('address').value;
    console.log(address);
    var countproduct = web3.eth.contract(abiDatabase).at(db_contract).getCountProductOfOwner.call(address).toNumber();

    var data = [];

    for (i = 0; i < countproduct; i++) {
      var s = web3.eth.contract(abiDatabase).at(db_contract).getProductOfOwnerByAddress.call(address, i)
      data.push(s);

    }
    console.log(data);

    for (i = 0; i < data.length; i++) {
      $("#productOfAccount").append(`
        <tr>
          <td>${i}</td>
          <td> <a href="/${data[i]}">${data[i]}</a></td>
           </tr>
      `);


    }
  }