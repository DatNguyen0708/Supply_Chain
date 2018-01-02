window.onload = function () {
    getContractAddress(function (db_contract, error) {
        if (error != null) {
            //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
            console.log(error);
            throw "Cannot load contract address";
        }

        dbContract = web3.eth.contract(abiDatabase).at(db_contract);

        productContract = web3.eth.contract(abiProduct).at(db_contract);
        
        console.log(db_contract);
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

        var owners = [];

        var name = [];

        var factory = [];


        for (n = 0; n < data.length; n++) {

            owners[n] = web3.eth.contract(abiProduct).at(data[n]).getOwner.call().toString();

            name[n] = web3.toUtf8(web3.eth.contract(abiProduct).at(data[n]).name.call().toString());

            console.log(owners[n]);

            console.log(name[n]);

            if(web3.eth.contract(abiProduct).at(data[n]).getCountParent.call() == 0){

                console.log("1 em nhe");

            $("#wrapper").append(`
            <div class="col-6 col-sm-4">
                <div class="card">
                    <div class="card-content">
                        <div class="card-header-red">
                           <h1 class="card-heading">${name[n]}</h1>
                        </div>
                        <div class="card-body">
                          <p class="card-p">
                                Primary materials
                            </p>
                        </div>
                        <nav class="nav-tabs">
                            <ul class="nav nav-pills pull-left">
                                <li class="card-action"><a href="accountInformation/${owners[n]}"><b>Owner:${owners[n]}</b></a></li>
                                <li class="card-action"><a href="${data[n]}" class="w3-button w3-block w3-green">Detail</a></li>
                            </ul>                           
                        </nav>
                         </div>
                </div>
            </div>           
            `)
            }

            else {
            
            $("#wrapper").append(`
            <div class="col-6 col-sm-4">
                <div class="card">
                    <div class="card-content">
                        <div class="card-header-blue">
                           <h1 class="card-heading">${name[n]}</h1>
                        </div>
                        <div class="card-body">
                          <p class="card-p">
                                Secondary materials
                            </p>
                        </div>
                        <nav class="nav-tabs">
                            <ul class="nav nav-pills pull-left">
                                <li class="card-action"><a href="accountInformation/${owners[n]}"><b>Owner:${owners[n]}</b></a></li>
                                <li class="card-action"><a href="${data[n]}" class="w3-button w3-block w3-green">Detail</a></li>
                            </ul>                           
                        </nav>
                         </div>
                </div>
            </div>           
            `)
        }

}



 // <div class="w3-container">
 //                <p>Address : ${data[n]}</p>
 //                <hr>
 //            <p>Owner   : <a href="accountInformation/${owners[n]}">${owners[n]}</a></p>
                
 //            </div>
 //            <a href="${data[n]}" class="w3-button w3-block w3-blue">Detail</a>
 //            </div>




        
        //     var auctionSection = document.getElementById("page");
        //     var res = "";
        //     for(n = 0; n < 9; n++) { 


        //    res = res + "<div class='list-group'>" ;
        //    res = res + "<a href='javascript:void(0)' class='list-group-item active'>"; 
        //    res = res + "<h4 class='list-group-item-heading'>" +n+" </h4>" ;
        //    res = res + "<p class='list-group-item-text'>Lorem ipsum dim id est laborum.</p>" ;
        //    res = res + "</a>" ;
        //    res = res + "</div> ";


        // }dbContract



        // var ress="";

        // var paganiation1 = document.getElementById("a");

        // ress = ress + "<nav aria-label=...>";
        // ress = ress + "<ul class=pagination>";
        // ress = ress + "<li id='previous-page'>";
        // ress = ress + "<a href='javascript:void(0)' aria-label=Previous>";
        // ress = ress + "<span aria-hidden=true>&laquo;</span>";
        // ress = ress + "</a>";
        // ress = ress + "</li>";dbContract
        // ress = ress dbContract+ "</ul>";
        // ress = ress + "</nav>";



        //  auctionSection.innerHTML = res;
        //  paganiation1.innerHTML = ress;
    });
}


