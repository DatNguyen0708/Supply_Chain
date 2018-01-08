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

  //kiem tra co phai chu so huu db ko
  modifier onlyOwnerDB {
      if (msg.sender != ownerDB)
        revert();
      _;
  }

  // lay dia chi chu db
  function getOwnerDB() constant returns (address){
        return ownerDB;
  }

  // chuyen quyen so huu db 
  function transferOwnerDB(address _newOwnerDB) onlyOwnerDB{
    ownerDB = _newOwnerDB;
  }

  // kiem tra account co quyen tao sp ms hay ko
  function checkAccountRaw(address _account) returns (bool){
    for (uint i = 0; i < accountRaw.length ; i++) {
      if (_account == accountRaw[i]) {
          return true;
      }
    }
    return false;
  }

  // kiem tra account da co so huu sp hay chua
  function checkAccount(address _account) returns (bool){
    for (uint i = 0; i < accounts.length ; i++) {
      if (_account == accounts[i]) {
        return true;
      }
    }
    return false;
  }

  // access cho 1 account co quyen tao sp tho hay ko
  function AddlistAccountRaw(address _account) onlyOwnerDB {
      accountRaw.push(_account);
  }

  // them account vao danh sach account co so huu sp co trong he thong
  function AddlistAccount(address _account)  {
      accounts.push(_account);
  }

  // dem so luong account co so huu sp trong he thong
  function getCountAccount() constant returns (uint){
        return accounts.length;
  }

  // lay dia chi account theo id
  function getAddressAccount(uint idx) constant returns (address){
        return accounts[idx];
  }

  // dem so luong account 
  function getCountAccountRaw() constant returns (uint){
        return accountRaw.length;
  }

  // lay dia chi account co quyen tao nguyen lieu tho theo id
  function getAddressAccountRaw(uint idx) constant returns (address){
        return accountRaw[idx];
  }

  // gom cac san pham co chung chu so huu
  function AddlistProductOfOwner(address _handler, address _pro){
      productOfOwner[_handler].push(_pro);
  }

  //luu tru dia chi cua product moi vao db
  function storeProductReference(address productAddress) {
       products.push(productAddress);
  }

  // tao sp moi
  function createProduct(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint[] _ratio, address _handler, uint _expirydateChild) returns(address) {
        return new Product(_name, _parentProducts, _unit, _amount, _ratio, _handler, _expirydateChild, this);
  }

  // so product hien tai duoc luu trong contract database
  function getCountProduct() constant returns (uint){
        return products.length;
  }

  // lay dia chi product
  function getAddressProduct(uint idx) constant returns (address){
        return products[idx];
  }

  // dem so pro thuoc quyen so huu cua 1 account bat ky
  function getCountProductOfOwner(address _handler) constant returns (uint) {
        return productOfOwner[_handler].length;
  }

  // lay dia chi pro theo id
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

    // check quyen huy sp nao do khi nay sinh van de
    modifier onlyAccessCancel {
      if ((msg.sender != owner) && (msg.sender != Database(DATABASE_CONTRACT).getOwnerDB()))
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

    uint public expirydate;

    uint[] public ratioPro;


    // mang cac hanh dong duoc thuc hien tren sp do
    Action[] public actions;

    function Product(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint[] _ratio, address handler, uint _expirydate, address _DATABASE_CONTRACT) {

      name = _name;
      parentProducts = _parentProducts;
      unit = _unit;
      amount = _amount;
      expirydate = _expirydate;

      if (expirydate <= now){
        revert();
      }


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

    // tao hanh dong tren mot sp bat ky
    function derive(bytes32 newProductsName, bytes32 unitChild, uint amountChild, uint ratioToChild, uint expirydateChild) notConsumed onlyOwner{ 

        if ((expirydateChild <= now) || (amount < totalSpend)) {
          revert();
        }

        uint totalSpend = amountChild * ratioToChild;

        if (amount == totalSpend){
          isConsumed = true;
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

        address newProduct = database.createProduct(newProductsName, parentProduct, unitChild, amountChild, ratio1, owner, expirydateChild ); 
        childProducts.push(newProduct);       
    }

    // lay action
    function getAction(uint idx) constant returns (string, uint, uint) {
        Action storage a = actions[idx];

        return (a.description,
                a.timestamp,
                a.ratio
                );
    }

    //chuyen quyen so huu product cho ng khac
    function transferOwnership(address _newOwner, uint _amount) onlyOwner{

        if((_newOwner == owner) || (amount < _amount) || (expirydate <= now)){
          revert();
        }

        bool check = false;

        Action memory action;
        action.description ="Tranfer to new Owner"; 
        action.timestamp = now;
        actions.push(action);

        for (uint i = 0; i < parentProducts.length; i++){
          Product pro = Product(parentProducts[i]);
          if ((_newOwner == pro.getOwner()) && (pro.getName() == name)){
            check = true;
            pro.setAmount(pro.getAmount() + _amount);
            this.setAmount(this.getAmount() - _amount);
            if (this.getAmount() == 0) {
              this.setConsumed(true);
            }   
            break;
          }
        }
        if (check == false){       
          address[] memory parentProduct = new address[](1);
          parentProduct[0] = this;
          uint[] memory ratio1 = new uint[](1);
          ratio1[0] = 0;

          this.setAmount(this.getAmount() - _amount);

          if (this.getAmount() == 0) {
              this.setConsumed(true);
          }   

          address newProduct = Database(DATABASE_CONTRACT).createProduct( name, parentProduct, unit, _amount, ratio1, _newOwner, expirydate);  
          childProducts.push(newProduct);             
        }
        
    }
    // get owner
    function getOwner() constant returns (address){
        return owner;
    }

    // lay ten sp
    function getName() constant returns (bytes32){
        return name;
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

    function cancel() onlyAccessCancel{
      this.setAmount(0);
      this.setConsumed(true);
    }

    // them so luong product neu da su dung het, ap dung voi nguyen lieu tho
    function setNewAmount(uint _newAmount) onlyHaveChild onlyOwner{
        if(_newAmount < 0){
          revert();
        }
        amount = _newAmount; 

        if(amount == 0){
          isConsumed = true;
        }
        else{
          isConsumed= false;
        }
    }

    // Ham ket hop nhieu sp thanh mot sp
    function merge( address[] otherProducts, bytes32 newProductName,uint[] ratioToProduct,uint newProductAmount, bytes32 newProductUnit, uint expirydateChild) notConsumed  {
        if ((expirydateChild <= now) || (otherProducts.length != ratioToProduct.length )) {
          revert();
        }

        for (uint i = 0; i < otherProducts.length; i++) {
          Product pro = Product(otherProducts[i]);
          if((pro.getOwner() != msg.sender) || (pro.getAmount() < (newProductAmount * ratioToProduct[i]))) revert(); 
        }

        address newProduct = Database(DATABASE_CONTRACT).createProduct(newProductName, otherProducts, newProductUnit, newProductAmount, ratioToProduct, owner, expirydateChild);

        for (uint k = 0; k < otherProducts.length; k++){
          Product pro2 = Product(otherProducts[k]);
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

//db  0x1461514A707A7F3A4aB61fd421C8b5734c136631
//ac2 0xb7aa436D720Dc881C6C7bD68668Ae41De896C9bc
//ac3 0x914eCd4226C84011A5fE24415bEb4f1089873660