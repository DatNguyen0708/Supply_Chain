

window.onload = function () {
    getContractAddress(function (db_contract, error) {
        if (error != null) {
            //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
            console.log(error);
            throw "Cannot load contract address";
        }

        dbContract = web3.eth.contract(abiDatabase).at(db_contract);
        console.log(web3.eth.contract(abiDatabase).at(db_contract).getCountProduct.call().toNumber());

        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            accounts = accs;
            account = accounts[1];
        });

        var a = web3.eth.contract(abiDatabase).at(db_contract).getCountProduct.call().toNumber();
        console.log(a);


        var data = [];

        for (i = 0; i < a; i++) {

            var s = web3.eth.contract(abiDatabase).at(db_contract).getAddressProduct.call(i)
            data.push(s);

        }
        console.log(data);

        var owners=[];
        for (n = 0; n < data.length; n++) {
            owners[n] = web3.eth.contract(abiProduct).at(data[n]).getOwner.call().toString();
            console.log(owners[n]);
            $("#wrapper").append(`
                <div class="col-lg-4 col-md-6 mb-4">

                    <header class="w3-container w3-light-grey">
                      <h3>Product</h3>
                    </header>

                    <div class="w3-container">
                      <p>Address : ${data[n]}</p>
                      <hr>
                      
                      <p>Owner   : <a href="accountInformation/${owners[n]}">${owners[n]}</a></p>
                    </div>

                    <a href="${data[n]}" class="w3-button w3-block w3-blue">Detail</a>

                </div>

            `)
        }

    });
}







