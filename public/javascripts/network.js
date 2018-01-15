getContractAddress = function(callback) {
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            
            console.log('Unknown network');
            error = "Failed to load ethereum network and smart contract";

        } else if (result == "1" || result == "2" || result == "3") {

            //solo network
            if (result == "1") {
                db_contract = '0xdD16fC4C93B2B649E3D05D5B01f4478f5D4089a9'; 
                //db_contract = '0x79001D80AbF5360dea671f52c496bf2Da3728811';           
            }

            //Testnet Setup Morden
            if (result == "2") {
               
            }

            // TestNet Ropsten
            if (result == "3") {
                db_contract = "0x4Ad1feC382877Ed919f5e7221514b203195057DA";              
            }
        } 

        console.log("network id: " + result);

        console.log("db contract: " + db_contract);

        callback(db_contract, error);

    });
};
