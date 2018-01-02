var abi =[ { "constant": true, "inputs": [ { "name": "_handler", "type": "address" } ], "name": "getCountProductOfOwner", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "bytes32" }, { "name": "_parentProducts", "type": "address[]" }, { "name": "_unit", "type": "bytes32" }, { "name": "_amount", "type": "uint256" }, { "name": "_ratio", "type": "uint256" }, { "name": "_handler", "type": "address" } ], "name": "createProduct", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_handler", "type": "address" }, { "name": "idx", "type": "uint256" } ], "name": "getProductOfOwnerByAddress", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "products", "outputs": [ { "name": "", "type": "address", "value": "0xf6020bf7f7d65220175fe00283a0d06737732be2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "productAddress", "type": "address" } ], "name": "storeProductReference", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "productOfOwner", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountProduct", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_handler", "type": "address" }, { "name": "_pro", "type": "address" } ], "name": "AddlistProductOfOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressProduct", "outputs": [ { "name": "", "type": "address", "value": "0xf6020bf7f7d65220175fe00283a0d06737732be2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" } ];
var add= '0x9ca4229bcFb86bC1a0e871b35c1D55C4BFa15ae9';
var abi0=[ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "bytes32", "value": "0x4d61742074726f692063756120656d0000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newOwner", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "childProducts", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "setAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "DATABASE_CONTRACT", "outputs": [ { "name": "", "type": "address", "value": "0x9ca4229bcfb86bc1a0e871b35c1d55c4bfa15ae9" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountAction", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountParent", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newProductAddress", "type": "address" }, { "name": "ratioToProduct", "type": "uint256" } ], "name": "collaborateInMerge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressChildByIdx", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "actions", "outputs": [ { "name": "description", "type": "string", "value": "Product creation" }, { "name": "timestamp", "type": "uint256", "value": "1514860516" }, { "name": "ratio", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address", "value": "0x0a5300997c07535353ce9038ca4814a457e4bbca" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x0a5300997c07535353ce9038ca4814a457e4bbca" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "otherProducts", "type": "address[]" }, { "name": "newProductName", "type": "bytes32" }, { "name": "ratioToProduct", "type": "uint256[]" }, { "name": "newProductAmount", "type": "uint256" }, { "name": "newProductUnit", "type": "bytes32" } ], "name": "merge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "unit", "outputs": [ { "name": "", "type": "bytes32", "value": "0x7068756f6e67206c790000000000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newAmount", "type": "uint256" } ], "name": "setNewAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "amount", "outputs": [ { "name": "", "type": "uint256", "value": "10000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAction", "outputs": [ { "name": "", "type": "string", "value": "Product creation" }, { "name": "", "type": "uint256", "value": "1514860516" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_consumed", "type": "bool" } ], "name": "setConsumed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountChild", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAmount", "outputs": [ { "name": "", "type": "uint256", "value": "10000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressParentByIdx", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "parentProducts", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newProductsNames", "type": "bytes32[]" }, { "name": "units", "type": "bytes32[]" }, { "name": "amounts", "type": "uint256[]" }, { "name": "ratios", "type": "uint256[]" } ], "name": "addAction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_name", "type": "bytes32", "index": 0, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name", "template": "elements_input_bytes", "value": "0x4d61742074726f692063756120656d" }, { "name": "_parentProducts", "type": "address[]", "index": 1, "typeShort": "address", "bits": "[]", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;parent Products", "template": "elements_input_json", "value": [] }, { "name": "_unit", "type": "bytes32", "index": 2, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;unit", "template": "elements_input_bytes", "value": "0x7068756f6e67206c79" }, { "name": "_amount", "type": "uint256", "index": 3, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount", "template": "elements_input_uint", "value": "10000" }, { "name": "_ratio", "type": "uint256", "index": 4, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ratio", "template": "elements_input_uint", "value": "" }, { "name": "handler", "type": "address", "index": 5, "typeShort": "address", "bits": "", "displayName": "handler", "template": "elements_input_address", "value": "0x0A5300997c07535353Ce9038ca4814a457E4bBCa" }, { "name": "_DATABASE_CONTRACT", "type": "address", "index": 6, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp; D A T A B A S E&thinsp;<span class=\"punctuation\">_</span>&thinsp; C O N T R A C T", "template": "elements_input_address", "value": "0x9ca4229bcFb86bC1a0e871b35c1D55C4BFa15ae9" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" } ];
var bytecode = '0x606060405234156200001057600080fd5b60405162002a8c38038062002a8c8339810160405280805190602001909190805182019190602001805190602001909190805190602001909190805190602001909190805190602001909190805190602001909190505062000071620003e2565b600088600581600019169055506000600460006101000a81548160ff0219169083151502179055508760029080519060200190620000b19291906200040c565b5086600681600019169055508560078190555083600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280601081526020017f50726f64756374206372656174696f6e000000000000000000000000000000008152508260000181905250428260200181815250508482604001818152505060088054806001018281620001ad91906200049b565b916000526020600020906003020160008490919091506000820151816000019080519060200190620001e1929190620004d0565b5060208201518160010155604082015181600201555050506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663f87ee183600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16306040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b15156200030e57600080fd5b6102c65a03f115156200032057600080fd5b5050508073ffffffffffffffffffffffffffffffffffffffff1663805593db306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515620003be57600080fd5b6102c65a03f11515620003d057600080fd5b50505050505050505050505062000669565b606060405190810160405280620003f862000557565b815260200160008152602001600081525090565b82805482825590600052602060002090810192821562000488579160200282015b82811115620004875782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200042d565b5b5090506200049791906200056b565b5090565b815481835581811511620004cb57600302816003028360005260206000209182019101620004ca9190620005b1565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200051357805160ff191683800117855562000544565b8280016001018555821562000544579182015b828111156200054357825182559160200191906001019062000526565b5b509050620005539190620005f5565b5090565b602060405190810160405280600081525090565b620005ae91905b80821115620005aa57600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555060010162000572565b5090565b90565b620005f291905b80821115620005ee5760008082016000620005d491906200061d565b6001820160009055600282016000905550600301620005b8565b5090565b90565b6200061a91905b8082111562000616576000816000905550600101620005fc565b5090565b90565b50805460018160011615610100020316600290046000825580601f1062000645575062000666565b601f016020900490600052602060002090810190620006659190620005f5565b5b50565b61241380620006796000396000f300606060405260043610610149576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146101595780630a2766801461018a5780630a430d89146101cc578063271f88b41461022f578063301374c61461025257806339caf01f146102a7578063465fca2f146102d057806351c00f91146102fd5780635ca1afad1461032657806361f36f21146103685780637a0d0031146103cb57806383240f83146103f8578063893d20e8146104bf5780638da5cb5b146105145780639062c51814610569578063907af6c014610626578063a41d359f14610657578063aa8c217c1461067a578063b6e76873146106a3578063c15111161461074d578063c701b68a14610772578063d321fe291461079b578063e9c43d46146107c4578063f227867f14610827578063fb9323bc1461088a575b341561015457600080fd5b600080fd5b341561016457600080fd5b61016c6109a4565b60405180826000191660001916815260200191505060405180910390f35b341561019557600080fd5b6101ca600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506109aa565b005b34156101d757600080fd5b6101ed6004808035906020019091905050610e51565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023a57600080fd5b6102506004808035906020019091905050610e90565b005b341561025d57600080fd5b610265610e9a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102b257600080fd5b6102ba610ebf565b6040518082815260200191505060405180910390f35b34156102db57600080fd5b6102e3610ecc565b604051808215151515815260200191505060405180910390f35b341561030857600080fd5b610310610ee3565b6040518082815260200191505060405180910390f35b341561033157600080fd5b610366600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610ef0565b005b341561037357600080fd5b610389600480803590602001909190505061102a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103d657600080fd5b6103de61106e565b604051808215151515815260200191505060405180910390f35b341561040357600080fd5b6104196004808035906020019091905050611081565b60405180806020018481526020018381526020018281038252858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156104ae5780601f10610483576101008083540402835291602001916104ae565b820191906000526020600020905b81548152906001019060200180831161049157829003601f168201915b505094505050505060405180910390f35b34156104ca57600080fd5b6104d26110b9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561051f57600080fd5b6105276110e3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561057457600080fd5b610624600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091908035600019169060200190919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001909190803560001916906020019091905050611109565b005b341561063157600080fd5b61063961192f565b60405180826000191660001916815260200191505060405180910390f35b341561066257600080fd5b6106786004808035906020019091905050611935565b005b341561068557600080fd5b61068d6119d3565b6040518082815260200191505060405180910390f35b34156106ae57600080fd5b6106c460048080359060200190919050506119d9565b6040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156107105780820151818401526020810190506106f5565b50505050905090810190601f16801561073d5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b341561075857600080fd5b61077060048080351515906020019091905050611abd565b005b341561077d57600080fd5b610785611b7a565b6040518082815260200191505060405180910390f35b34156107a657600080fd5b6107ae611b87565b6040518082815260200191505060405180910390f35b34156107cf57600080fd5b6107e56004808035906020019091905050611b91565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561083257600080fd5b6108486004808035906020019091905050611bd5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561089557600080fd5b6109a2600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050611c14565b005b60055481565b6109b26121f9565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a1157600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161415610a6c57600080fd5b836007541015610a7b57600080fd5b836007541415610b0d573073ffffffffffffffffffffffffffffffffffffffff1663c151111660016040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082151515158152602001915050600060405180830381600087803b1515610af857600080fd5b6102c65a03f11515610b0957600080fd5b5050505b6001604051805910610b1c5750595b9080825280602002602001820160405250925030836000815181101515610b3f57fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250503073ffffffffffffffffffffffffffffffffffffffff1663271f88b4853073ffffffffffffffffffffffffffffffffffffffff1663d321fe296000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610c0457600080fd5b6102c65a03f11515610c1557600080fd5b50505060405180519050036040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1515610c7157600080fd5b6102c65a03f11515610c8257600080fd5b5050506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691508173ffffffffffffffffffffffffffffffffffffffff16633fcc53d6600554856006548860008b6000604051602001526040518763ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018087600019166000191681526020018060200186600019166000191681526020018581526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825287818151815260200191508051906020019060200280838360005b83811015610da1578082015181840152602081019050610d86565b50505050905001975050505050505050602060405180830381600087803b1515610dca57600080fd5b6102c65a03f11515610ddb57600080fd5b50505060405180519050905060038054806001018281610dfb919061220d565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050565b600381815481101515610e6057fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060078190555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600880549050905090565b6000600460009054906101000a900460ff16905090565b6000600280549050905090565b610ef8612239565b600460009054906101000a900460ff1615610f1257600080fd5b60038054806001018281610f26919061220d565b9160005260206000209001600085909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506040805190810160405280601481526020017f436f6c6c61626f7261746520696e206d657267650000000000000000000000008152508160000181905250428160200181815250508181604001818152505060088054806001018281610fdb9190612261565b91600052602060002090600302016000839091909150600082015181600001908051906020019061100d929190612293565b506020820151816001015560408201518160020155505050505050565b600060038281548110151561103b57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600460009054906101000a900460ff1681565b60088181548110151561109057fe5b906000526020600020906003020160009150905080600001908060010154908060020154905083565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6111116121f9565b6000806000806000806000600460009054906101000a900460ff161561113657600080fd5b8a5160018e510114151561114957600080fd5b60018d510160405180591061115b5750595b90808252806020026020018201604052509750600096505b8c518710156111eb578c8781518110151561118a57fe5b9060200190602002015188888151811015156111a257fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508680600101975050611173565b30888e518151811015156111fb57fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600095505b87518610156113d857878681518110151561125357fe5b9060200190602002015194503373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1663893d20e86000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156112e257600080fd5b6102c65a03f115156112f357600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1614151561131f57600080fd5b8a8681518110151561132d57fe5b906020019060200201518a028573ffffffffffffffffffffffffffffffffffffffff1663d321fe296000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156113a557600080fd5b6102c65a03f115156113b657600080fd5b5050506040518051905010156113cb57600080fd5b858060010196505061123c565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1693508373ffffffffffffffffffffffffffffffffffffffff16633fcc53d68d8a8c8e6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000604051602001526040518763ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018087600019166000191681526020018060200186600019166000191681526020018581526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825287818151815260200191508051906020019060200280838360005b838110156115125780820151818401526020810190506114f7565b50505050905001975050505050505050602060405180830381600087803b151561153b57600080fd5b6102c65a03f1151561154c57600080fd5b505050604051805190509250600091505b875182101561192057878281518110151561157457fe5b9060200190602002015190508073ffffffffffffffffffffffffffffffffffffffff1663271f88b48c848151811015156115aa57fe5b906020019060200201518c028373ffffffffffffffffffffffffffffffffffffffff1663d321fe296000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561162257600080fd5b6102c65a03f1151561163357600080fd5b50505060405180519050036040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561168f57600080fd5b6102c65a03f115156116a057600080fd5b5050508073ffffffffffffffffffffffffffffffffffffffff16635ca1afad848d858151811015156116ce57fe5b906020019060200201516040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b151561175c57600080fd5b6102c65a03f1151561176d57600080fd5b50505060008173ffffffffffffffffffffffffffffffffffffffff1663d321fe296000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156117de57600080fd5b6102c65a03f115156117ef57600080fd5b50505060405180519050141561188b578073ffffffffffffffffffffffffffffffffffffffff1663c151111660016040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082151515158152602001915050600060405180830381600087803b151561187257600080fd5b6102c65a03f1151561188357600080fd5b505050611913565b8073ffffffffffffffffffffffffffffffffffffffff1663c151111660006040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082151515158152602001915050600060405180830381600087803b15156118fe57600080fd5b6102c65a03f1151561190f57600080fd5b5050505b818060010192505061155d565b50505050505050505050505050565b60065481565b600060028054905014151561194957600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156119a557600080fd5b806007600082825401925050819055506000600460006101000a81548160ff02191690831515021790555050565b60075481565b6119e1612313565b60008060006008858154811015156119f557fe5b906000526020600020906003020190508060000181600101548260020154828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611aa85780601f10611a7d57610100808354040283529160200191611aa8565b820191906000526020600020905b815481529060010190602001808311611a8b57829003601f168201915b50505050509250935093509350509193909250565b80600460006101000a81548160ff02191690831515021790555060011515600460009054906101000a900460ff1615151415611b77573073ffffffffffffffffffffffffffffffffffffffff1663271f88b460006040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1515611b6257600080fd5b6102c65a03f11515611b7357600080fd5b5050505b50565b6000600380549050905090565b6000600754905090565b6000600282815481101515611ba257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600281815481101515611be457fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080611c1f612239565b600080611c2a6121f9565b6000600460009054906101000a900460ff1615611c4657600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611ca257600080fd5b89518b51141580611cb5575088518b5114155b80611cc2575087518b5114155b15611ccc57600080fd5b60009650600095505b8851861015611d20578786815181101515611cec57fe5b906020019060200201518987815181101515611d0457fe5b9060200190602002015102870196508580600101965050611cd5565b866007541015611d2f57600080fd5b866007541115611d59576000600460006101000a81548160ff021916908315150217905550611d75565b6001600460006101000a81548160ff0219169083151502179055505b3073ffffffffffffffffffffffffffffffffffffffff1663271f88b4883073ffffffffffffffffffffffffffffffffffffffff1663d321fe296000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611dfe57600080fd5b6102c65a03f11515611e0f57600080fd5b50505060405180519050036040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1515611e6b57600080fd5b6102c65a03f11515611e7c57600080fd5b5050506040805190810160405280600b81526020017f4164642050726f6475637400000000000000000000000000000000000000000081525085600001819052504285602001818152505060088054806001018281611edb9190612261565b916000526020600020906003020160008790919091506000820151816000019080519060200190611f0d929190612293565b5060208201518160010155604082015181600201555050506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169350600092505b8a518310156121ec576001604051805910611f665750595b9080825280602002602001820160405250915030826000815181101515611f8957fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508373ffffffffffffffffffffffffffffffffffffffff16633fcc53d68c85815181101515611fef57fe5b90602001906020020151848d8781518110151561200857fe5b906020019060200201518d8881518110151561202057fe5b906020019060200201518d8981518110151561203857fe5b90602001906020020151600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000604051602001526040518763ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018087600019166000191681526020018060200186600019166000191681526020018581526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825287818151815260200191508051906020019060200280838360005b8381101561213657808201518184015260208101905061211b565b50505050905001975050505050505050602060405180830381600087803b151561215f57600080fd5b6102c65a03f1151561217057600080fd5b50505060405180519050905060038054806001018281612190919061220d565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508280600101935050611f4e565b5050505050505050505050565b602060405190810160405280600081525090565b815481835581811511612234578183600052602060002091820191016122339190612327565b5b505050565b60606040519081016040528061224d61234c565b815260200160008152602001600081525090565b81548183558181151161228e5760030281600302836000526020600020918201910161228d9190612360565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106122d457805160ff1916838001178555612302565b82800160010185558215612302579182015b828111156123015782518255916020019190600101906122e6565b5b50905061230f9190612327565b5090565b602060405190810160405280600081525090565b61234991905b8082111561234557600081600090555060010161232d565b5090565b90565b602060405190810160405280600081525090565b61239c91905b80821115612398576000808201600061237f919061239f565b6001820160009055600282016000905550600301612366565b5090565b90565b50805460018160011615610100020316600290046000825580601f106123c557506123e4565b601f0160209004906000526020600020908101906123e39190612327565b5b505600a165627a7a72305820c2f34ea6b8de990abf0dd6e49739740855b4e0a1bc62644b6544dfa2427ed5ca0029';