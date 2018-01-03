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

            name[n] = web3.toUtf8(web3.eth.contract(abiProduct).at(data[n]).name.call().toString()).toUpperCase();

            console.log(owners[n]);

            console.log(name[n]);

            if(web3.eth.contract(abiProduct).at(data[n]).getCountParent.call() == 0){

                $("#wrapper").append(`
                    <div class="col-md-4">   
                            <div class="panel-group">
                                <div class="panel panel-danger">
                                  <div class="panel-heading" >${name[n]}</div>
                                  <div class="panel-body test">
                                        <b style="color: #FF3333;">Owner : </b><a href="accountInformation/${owners[n]}">${owners[n]}</a>
                                        <nav class="nav-tabs" style="margin-top:5px;">
                                            <ul class="nav nav-pills pull-left">
                                                <a href="${data[n]}" class="w3-button w3-block w3-green" style="align:center;">Detail</a>  
                                            </ul>                           
                                        </nav>
                                  </div>
                              </div>
                          </div>                   
                    </div>   
                `)   
            }

            else {
            
                $("#wrapper").append(`
                    <div class="col-md-4">   
                            <div class="panel-group">
                                <div class="panel panel-success">
                                  <div class="panel-heading" >${name[n]}</div>
                                  <div class="panel-body test">
                                        <b style="color: green;">Owner : </b><a href="accountInformation/${owners[n]}">${owners[n]}</a>
                                        <nav class="nav-tabs" style="margin-top:5px;">
                                            <ul class="nav nav-pills pull-left">
                                                <a href="${data[n]}" class="w3-button w3-block w3-green" style="align:center;">Detail</a>  
                                            </ul>                           
                                        </nav>
                                  </div>
                              </div>
                          </div>                   
                    </div>   
                `)   
            }

        }
    });
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








