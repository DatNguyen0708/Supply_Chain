pragma solidity ^ 0.4 .15;

contract Database {
  // mang dia chi product ma database nay luu tru
  address[] public products;

  // mang dia chi account dc quyen tao nguyen lieu tho
  address[] public accountRaw;

  //chu so huu contract (admin)
  address public ownerDB;

  //mang dia chi account cos so huu product
  address[] public accounts;

  // Constructor to create a Database 
  function Database() {
      ownerDB= msg.sender;
  }

  function() {
       // If anyone wants to send Ether to this contract, the transaction gets rejected
      revert();
  }


  mapping(address => address[]) public productOfOwner;

  modifier onlyOwnerDB {
      if (msg.sender != ownerDB)
        revert();
      _;
    }

    function checkAccountRaw(address _account) returns (bool){
    for (uint i = 0; i < accountRaw.length ; i++) {
      if (_account == accountRaw[i]) {
      return true;
      }
    }
    return false;
    }


    function checkAccount(address _account) returns (bool){
      for (uint i = 0; i < accounts.length ; i++) {
        if (_account == accounts[i]) {
          return true;
        }
      }
      return false;
    }

  function AddlistAccountRaw(address _account) onlyOwnerDB {
      accountRaw.push(_account);
  }
  function AddlistAccount(address _account)  {
      accounts.push(_account);
  }

  function getCountAccount() constant returns (uint){
        return accounts.length;
  }

  function getAddressAccount(uint idx) constant returns (address){
        return accounts[idx];
  }

  function AddlistProductOfOwner(address _handler, address _pro){
      productOfOwner[_handler].push(_pro);
  }

  //luu tru dia chi cua product moi vao db
  function storeProductReference(address productAddress) {
       products.push(productAddress);
  }

  function createProduct(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint[] _ratio, address _handler) returns(address) {

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

    uint[] public ratioPro;

    // mang cac hanh dong duoc thuc hien tren sp do
    Action[] public actions;

    function Product(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint[] _ratio, address handler, address _DATABASE_CONTRACT) {

      name = _name;
      parentProducts = _parentProducts;
      unit = _unit;
      amount = _amount;
      if (amount == 0) {
        revert();
      }

      isConsumed = false;

      owner = handler;

      DATABASE_CONTRACT = _DATABASE_CONTRACT;
      Database database = Database(DATABASE_CONTRACT);
      if (parentProducts.length == 0){
        if (msg.sender != owner){
          revert();
        }
        bool check = database.checkAccountRaw(owner);
          if (check == false){
            revert();         
        }       
      }
      bool check1 = database.checkAccount(owner);
      if( check1 == false){
        database.AddlistAccount(owner);
      }

      Action memory creation;
      creation.description = "Product creation";
      creation.timestamp = now;

      ratioPro = _ratio;

      actions.push(creation);

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
        action.ratio = ratioToChild;

        actions.push(action);

        Database database = Database(DATABASE_CONTRACT);

        address[] memory parentProduct = new address[](1);
        parentProduct[0] = this;

        uint[] memory ratio1 = new uint[](1);
        ratio1[0] = ratioToChild;

        address newProduct1 = database.createProduct(newProductsName, parentProduct, unitChild, amountChild, ratio1, owner ); 
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


        Action memory action;
        action.description ="Tranfer to new Owner"; 
        action.timestamp = now;
        actions.push(action);

    
        address[] memory parentProduct1 = new address[](1);
        parentProduct1[0] = this;

        uint[] memory ratio1 = new uint[](1);
        ratio1[0] = 0;

        this.setAmount(this.getAmount() - _amount);

        Database database = Database(DATABASE_CONTRACT);

        address newProduct2 = database.createProduct( name, parentProduct1, unit, _amount, ratio1, _newOwner );  

        childProducts.push(newProduct2);


    }
    // get owner
    function getOwner() constant returns (address){
        return owner;
    }

    function getCountRatioPro() constant returns (uint){
        return ratioPro.length;
    }

    function getRatioProByIdx(uint idx) constant returns (uint){
        return ratioPro[idx];
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
        if(_newAmount < 0){
          revert();
        }
        amount = _newAmount; 
        if(amount == 0){
          isConsumed = true;
        }else{
          isConsumed= false;
        }
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

        //Database database = Database(DATABASE_CONTRACT);

        address newProduct = Database(DATABASE_CONTRACT).createProduct(newProductName, parentProduct1, newProductUnit, newProductAmount, ratioToProduct, owner);

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

//db  0x9f9E6d33F87FB7792c1395CA35621206F822b593
//ac2 0x43DFED51209340608D8FECBca49D71F273eFaC6F
//ac3 0x732F164E7E7D56c138BEC03548a3A011C1B806dC
