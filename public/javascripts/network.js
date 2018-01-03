getContractAddress = function(callback) {
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            
            console.log('Unknown network');
            error = "Failed to load ethereum network and smart contract";

        } else if (result == "1" || result == "2" || result == "3") {

            //solo network
            if (result == "1") {
                db_contract = '0xDD6839c40C574202f34EDa4E1EA016f1160B9407';            
            }

            //Testnet Setup Morden
            if (result == "2") {
               
            }

            // TestNet Ropsten
            if (result == "3") {
                db_contract = "0x2ea9C97a56c2271c3088857FC19586F6ad9A5960";              
            }
        } 

        console.log("network id: " + result);

        console.log("db contract: " + db_contract);

        callback(db_contract, error);

    });
};
