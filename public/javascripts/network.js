getContractAddress = function(callback) {
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            console.log('Unknown network');
            ah_contract_addr = '';
            sn_contract_addr = '';
            error = "Failed to load ethereum network and smart contract";

        } else if (result == "1" || result == "2" || result == "'3") {
            if (result == "1") {
                db_contract = '0xd4713E2Dde2926F12A8bBd78201b2D416A352C11';
                pro_contract = '';
            }

            //Testnet Setup Morden
            if (result == "2") {
                //ah_contract_addr = "0x5fF10B4fA88623d4E2E8B7077ae5b8259A78867E";
                //sn_contract_addr = "0xfe4362ad1c80bbe89705f774af1d769a0f305605";
            }

            // New testnet Ropsten
            if (result == "3") {
                //console.log("Vo day nhe ban");
                ah_contract_addr = "0x2ea9C97a56c2271c3088857FC19586F6ad9A5960";
                sn_contract_addr = '';
            }
        } 
        console.log("network id: " + result);
        console.log("db contract: " + db_contract);
        //console.log("sample name contract addr: " + sn_contract_addr);

        callback(db_contract, error);

    });
};
