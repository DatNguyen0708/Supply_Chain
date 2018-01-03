pragma solidity ^ 0.4 .15;

contract Database {
  // mang dia chi product ma database nay luu tru
  address[] public products;

  // Constructor to create a Database 
  function Database() {}

  function() {
       // If anyone wants to send Ether to this contract, the transaction gets rejected
      revert();
  }


  mapping(address => address[]) public productOfOwner;

  function AddlistProductOfOwner(address _handler, address _pro){
      productOfOwner[_handler].push(_pro);
  }

  //luu tru dia chi cua product moi vao db
  function storeProductReference(address productAddress) {
       products.push(productAddress);
  }

  function createProduct(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint _ratio, address _handler) returns(address) {

        return new Product(_name, _parentProducts, _unit, _amount, _ratio, _handler, this);

  }

  // so product hien tai duoc luu trong contract database
  function getCountProduct() constant returns (uint){
        return products.length;
  }

  function getAddressProduct(uint idx) constant returns (address){
        return products[idx];
  }

  function getCountProductOfOwner(address _handler) constant returns (uint) {
        return productOfOwner[_handler].length;
  }

  function getProductOfOwnerByAddress(address _handler, uint idx) constant returns (address) {
        return productOfOwner[_handler][idx];
  }

}

contract Product {
    // noi luu dia chi product la mot database chung
    address public DATABASE_CONTRACT;

    address public owner;

    //struct Action chi hoat dong duoc thuc hien tren chuoi nay
    struct Action {

      //mo ta action
      string description;
    
      // dau thoi gian va numberblock khi action thuc hien xong
      uint timestamp;

      uint ratio;
    }

    // product da duoc su dung xong hay chua
    modifier notConsumed {
      if (isConsumed)
        revert();
      _;
    }

    // kiem tra no la chu hay ko
    modifier onlyOwner {
      if (msg.sender != owner)
        revert();
      _;
    }

    // kiem tra no la nguyen lieu tho hay khong
    modifier onlyHaveChild {
      if (parentProducts.length != 0)
        revert();
      _;
    }

    // mang dia chi cha cua sp hien tai
    address[] public parentProducts;

    // mang dia chi con cua sp hien tai
    address[] public childProducts;

    // kiem tra sp da sd chua
    bool public isConsumed;

    // ten sp
    bytes32 public name;

    bytes32 public unit;

    uint public amount;

    // mang cac hanh dong duoc thuc hien tren sp do
    Action[] public actions;

    function Product(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint _ratio, address handler, address _DATABASE_CONTRACT) {

        name = _name;
        parentProducts = _parentProducts;
        unit =_unit;
        amount= _amount;
        if (amount==0){
          revert();
        }
        
        isConsumed = false;
        
        owner = handler;

        DATABASE_CONTRACT = _DATABASE_CONTRACT;

        Action memory creation;
        creation.description = "Product creation";
        creation.timestamp = now;
        creation.ratio = _ratio;

        actions.push(creation);

        Database database = Database(DATABASE_CONTRACT);

        database.AddlistProductOfOwner(owner, this);

        database.storeProductReference(this);
    }

    function() {
        // If anyone wants to send Ether to this contract, the transaction gets rejected```
        revert();
    }


    function derive(bytes32 newProductsName, bytes32 unitChild, uint amountChild, uint ratioToChild) notConsumed onlyOwner{ 

        uint totalSpend = amountChild * ratioToChild;

        if (amount < totalSpend){
          revert();
        }

        if (amount == totalSpend){
          isConsumed=true;
        }

        this.setAmount(this.getAmount() - totalSpend);

        Action memory action;
        action.description = "Derived"; 
        action.timestamp = now;

        actions.push(action);

        Database database = Database(DATABASE_CONTRACT);

        address[] memory parentProduct = new address[](1);
        parentProduct[0] = this;
        address newProduct1 = database.createProduct(newProductsName, parentProduct, unitChild, amountChild, ratioToChild, owner ); 
        childProducts.push(newProduct1);
        
    }


    function getAction(uint idx) constant returns (string, uint, uint) {
        Action storage a = actions[idx];

        return (a.description,
                a.timestamp,
                a.ratio
                );
    }

    //chuyen quyen so huu product cho ng khac
    function transferOwnership(address _newOwner, uint _amount) onlyOwner{

        if(_newOwner == owner){
          revert();
        }

        if (amount < _amount) {
          revert();
        }

        if(amount == _amount) {

          this.setConsumed(true);
        }



        address[] memory parentProduct1 = new address[](1);
        parentProduct1[0] = this;

        this.setAmount(this.getAmount() - _amount);

        Database database = Database(DATABASE_CONTRACT);

        address newProduct2 = database.createProduct( name, parentProduct1, unit, _amount, 0, _newOwner );  

        childProducts.push(newProduct2);


    }
    // get owner
    function getOwner() constant returns (address){
        return owner;
    }

    // dem so hanh dong cua product hien tai
    function getCountAction() constant returns (uint){
        return actions.length;
    }

    // dem so cha cua product hien tai
    function getCountParent() constant returns (uint){
        return parentProducts.length;
    }

    //lay dia chi cha cua product theo id
    function getAddressParentByIdx(uint idx) constant returns (address){
        return parentProducts[idx];
    }

    // so con cua product hien tai
    function getCountChild() constant returns (uint){
        return childProducts.length;
    }

    //lay dia chi con cua product theo id
    function getAddressChildByIdx(uint idx) constant returns (address){
        return childProducts[idx];
    }

    // lay so luong hien tai cua product
    function getAmount() constant returns (uint){
        return amount;
    }

    // gan so luong cho product
    function setAmount(uint _amount){
       amount = _amount;
    }

    // check trang thai cua product da dc tieu thu het hay chua
    function getConsumed() constant returns (bool){
        return isConsumed;
    }

    // set trang thai da tieu thu het hay chua va truong hop product bi tieu huy do mot so ly do nao do
    function setConsumed(bool _consumed) {
        isConsumed = _consumed;
        if (isConsumed== true) this.setAmount(0); 
    }

    // them so luong product neu da su dung het, ap dung voi nguyen lieu tho
    function setNewAmount(uint _newAmount) onlyHaveChild onlyOwner{
        amount += _newAmount; 
        isConsumed= false;
    }

    function merge( address[] otherProducts, bytes32 newProductName,uint[] ratioToProduct,uint newProductAmount, bytes32 newProductUnit) notConsumed  {

        if ((otherProducts.length +1) != ratioToProduct.length )
           revert();

        //code them cho th xu ly phai la parent
        address[] memory parentProduct1 = new address[](otherProducts.length+1);

        for (uint i1 = 0; i1 < otherProducts.length; i1++) {
          parentProduct1[i1] = otherProducts[i1];
        }

        parentProduct1[otherProducts.length] = this;

        for (uint j1 = 0; j1 < parentProduct1.length; j1++) {

          Product pro1 = Product(parentProduct1[j1]);
          if(pro1.getOwner() != msg.sender) revert();
          if (pro1.getAmount() < (newProductAmount * ratioToProduct[j1])) revert();     
        }

        Database database = Database(DATABASE_CONTRACT);

        address newProduct = database.createProduct(newProductName, parentProduct1, newProductUnit, newProductAmount, 0, owner);

        for (uint k = 0; k < parentProduct1.length; k++){
          Product pro2 = Product(parentProduct1[k]);
          pro2.setAmount(pro2.getAmount() - (newProductAmount * ratioToProduct[k])) ; 
          pro2.collaborateInMerge(newProduct,ratioToProduct[k]);
          if (pro2.getAmount() == 0) pro2.setConsumed(true);  
          else pro2.setConsumed(false);
        }   
    }

    function collaborateInMerge(address newProductAddress, uint ratioToProduct) notConsumed {
        childProducts.push(newProductAddress);

        Action memory action;
        action.description = "Collaborate in merge";
        action.timestamp = now;
        action.ratio = ratioToProduct;

        actions.push(action);
    }

}

//db  0xdc4a70BB008ac8ce6e9b9F7f0765007BDe71f755
//ac2 0x70E93F08b2418636008C1aC7014fd69dC24b6701
//ac3 0x40B7472785be6BbbB8433576ce8F47a4762a7867
//ac4 
//ac5 

//pd1_ac3       0xa2d4540CFA30aC0a2a7Ff1f6ba978e851B1d1cAb    8800
//pd2_ac3       0x66FCe348E7742910135B536f5E0aa92289A1A2fb     200 -30    
//pd3_ac3       0x06178f2A79a2090377318948cc2176831E3258A9     200 -10
//pd4_ac3       0x84c9B3484Cd7c004AEA15065619B1796Fe9720AF     300
//pd5_ac3       0x57fcBdf932b703f824a688BF3fFc44C1310E3227     0 
//pd6_ac3       0x94eEf8996867a7e9cefa153A2b3762A0F63E9e0a    200
//pd7_ac4       0x1d73b14d761BB04ee61ebb8741d082cD245f378F    100 -20
//pd8_ac4_child   0x419C8D1CA8Dc2bc4f44eAf968507944B121897A6    10


//pd4   
//pd5   
//pd6 
//abi [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "bytes32", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newOwner", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "childProducts", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "setAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "DATABASE_CONTRACT", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newProductAddress", "type": "address" } ], "name": "collaborateInMerge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountParent", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressChildByIdx", "outputs": [ { "name": "", "type": "address", "value": "0xa20edb925ed23009eff6198ff27d643c15fdec4a" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ratio", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "description", "type": "string" }, { "name": "newProductsNames", "type": "bytes32[]" }, { "name": "units", "type": "bytes32[]" }, { "name": "amounts", "type": "uint256[]" }, { "name": "ratios", "type": "uint256[]" } ], "name": "addAction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "actions", "outputs": [ { "name": "description", "type": "string", "value": "Product creation" }, { "name": "timestamp", "type": "uint256", "value": "1514254204" }, { "name": "blockNumber", "type": "uint256", "value": "2466" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address", "value": "0xc6bb845e7e6903ff1ab642b0d0998f62dd6e1136" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xc6bb845e7e6903ff1ab642b0d0998f62dd6e1136" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "otherProducts", "type": "address[]" }, { "name": "newProductName", "type": "bytes32" }, { "name": "ratioToProduct", "type": "uint256[]" }, { "name": "newProductAmount", "type": "uint256" }, { "name": "newProductUnit", "type": "bytes32" } ], "name": "merge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "unit", "outputs": [ { "name": "", "type": "bytes32", "value": "0x6b67000000000000000000000000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newAmount", "type": "uint256" } ], "name": "setNewAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "amount", "outputs": [ { "name": "", "type": "uint256", "value": "9600" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAction", "outputs": [ { "name": "", "type": "string", "value": "Product creation" }, { "name": "", "type": "uint256", "value": "1514254204" }, { "name": "", "type": "uint256", "value": "2466" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_consumed", "type": "bool" } ], "name": "setConsumed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountChild", "outputs": [ { "name": "", "type": "uint256", "value": "2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAmount", "outputs": [ { "name": "", "type": "uint256", "value": "9600" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressParentByIdx", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "parentProducts", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_name", "type": "bytes32", "index": 0, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name", "template": "elements_input_bytes" }, { "name": "_parentProducts", "type": "address[]", "index": 1, "typeShort": "address", "bits": "[]", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;parent Products", "template": "elements_input_json" }, { "name": "_unit", "type": "bytes32", "index": 2, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;unit", "template": "elements_input_bytes" }, { "name": "_amount", "type": "uint256", "index": 3, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount", "template": "elements_input_uint" }, { "name": "_ratio", "type": "uint256", "index": 4, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ratio", "template": "elements_input_uint" }, { "name": "handler", "type": "address", "index": 5, "typeShort": "address", "bits": "", "displayName": "handler", "template": "elements_input_address" }, { "name": "_DATABASE_CONTRACT", "type": "address", "index": 6, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp; D A T A B A S E&thinsp;<span class=\"punctuation\">_</span>&thinsp; C O N T R A C T", "template": "elements_input_address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" } ]
