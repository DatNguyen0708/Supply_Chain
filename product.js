const Web3 = require('web3');
const web3 = new Web3("http://localhost:8545");

module.exports = {
    getContractAddress(db_contract, pro_contract) {
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
        //  console.log(data);
        return data;
    }
}

getContractAddress = function(callback) {
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            console.log('Unknown network');
            ah_contract_addr = '';
            sn_contract_addr = '';
            error = "Failed to load ethereum network and smart contract";

        } else if (result == "1" || result == "2" || result == "'3") {
            if (result == "1") {
                db_contract = '0x5D80f52DeE91E8B91519ca4E43a5d57f2De3bb6F';
                pro_contract = '';
                //error("AuctionHouse is not deployed to the main net yet, please try the test net");
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

        callback(db_contract, pro_contract, error);

    });
};