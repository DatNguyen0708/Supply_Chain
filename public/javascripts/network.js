getContractAddress = function(callback) {
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            
            console.log('Unknown network');
            error = "Failed to load ethereum network and smart contract";

        } else if (result == "1" || result == "2" || result == "3") {

            //solo network
            if (result == "1") {
                db_contract = '0xdc4a70BB008ac8ce6e9b9F7f0765007BDe71f755';            
            }

            //Testnet Setup Morden
            if (result == "2") {
               
            }

            // TestNet Ropsten
            if (result == "3") {
                db_contract = "0xdc4a70BB008ac8ce6e9b9F7f0765007BDe71f755";              
            }
        } 

        console.log("network id: " + result);

        console.log("db contract: " + db_contract);

        callback(db_contract, error);

    });
};
