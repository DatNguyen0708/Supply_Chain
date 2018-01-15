pragma solidity ^ 0.4 .15;

contract Database {

  // mang dia chi product ma database nay luu tru
  address[] public products;
  //chu so huu contract (admin)
  address public ownerDB;

  struct OwnerPro {

    bytes32 name;

    bytes32 description;

    bool checkRaw;

    address ownerPro;

    bytes32 phonenumber;

    bytes32 email;
  }

  // mang dia chi account dc quyen tao nguyen lieu tho
  OwnerPro[] public accounts;

  // Constructor to create a Database 
  function Database() {
    ownerDB = msg.sender;
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
  function getOwnerDB() constant returns(address) {
    return ownerDB;
  }

  // chuyen quyen so huu db 
  function transferOwnerDB(address _newOwnerDB) onlyOwnerDB {
    ownerDB = _newOwnerDB;
  }

  function editAccount(address _account, bytes32 _name, bytes32 _description, bool _checkRaw, bytes32 _phonenumber, bytes32 _email) onlyOwnerDB {
    if((_name == "") || (_description == "") || (_description == "") || (_phonenumber == "") || (_email == "")) {
      revert();
    }
    for (uint i = 0; i < accounts.length; i++) {
      OwnerPro storage a = accounts[i];
      if(a.ownerPro == _account){
        a.name = _name;
        a.description = _description;
        a.checkRaw = _checkRaw;
        a.phonenumber = _phonenumber;
        a.email = _email;
        return;
      }
    }
    revert();
  }

  // kiem tra account co quyen tao sp ms hay ko
  function checkAccount(address _account) returns(uint) {
    for (uint i = 0; i < accounts.length; i++) {
      OwnerPro storage a = accounts[i];
      if (a.ownerPro == _account) {
        if (a.checkRaw == true) {
          return 1;
        } else {
          return 0;
        }
      }
    }
    return 2;
  }

  // access cho 1 account co quyen tao sp tho hay ko
  function AddlistAccount(address _account, bytes32 _name, bytes32 _description, bool _checkRaw, bytes32 _phonenumber, bytes32 _email) onlyOwnerDB {
    if((_name == "") || (_description == "") || (_description == "") || (_phonenumber == "") || (_email == "")) {
      revert();
    }
    for (uint i = 0; i < accounts.length; i++) {
      OwnerPro storage a1 = accounts[i];
      if (a1.ownerPro == _account) {
        revert();
      }
    }
    uint accountId = accounts.length++;
    OwnerPro storage a = accounts[accountId];

    a.name = _name;
    a.description = _description;
    a.ownerPro = _account;
    a.checkRaw = _checkRaw;
    a.phonenumber = _phonenumber;
    a.email = _email;
  }

  // dem so luong account co so huu sp trong he thong
  function getCountAccount() constant returns(uint) {
    return accounts.length;
  }

  // lay dia chi account theo id
  function getAccount(uint idx) constant returns(address, bytes32, bytes32, bool, bytes32, bytes32) {

    OwnerPro storage a = accounts[idx];
    return (
      a.ownerPro,
      a.name,
      a.description,
      a.checkRaw,
      a.phonenumber,
      a.email
    );
  }

  // gom cac san pham co chung chu so huu
  function AddlistProductOfOwner(address _handler, address _pro) {
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
  function getCountProduct() constant returns(uint) {
    return products.length;
  }

  // lay dia chi product
  function getAddressProduct(uint idx) constant returns(address) {
    return products[idx];
  }

  // dem so pro thuoc quyen so huu cua 1 account bat ky
  function getCountProductOfOwner(address _handler) constant returns(uint) {
    return productOfOwner[_handler].length;
  }

  // lay dia chi pro theo id
  function getProductOfOwnerByAddress(address _handler, uint idx) constant returns(address) {
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

    uint amount;
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

  modifier onlyPro {
    if (isContract(msg.sender) == false)
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

  event ActionMerge(address merge);
  event ActionDerive(address derive);

  // mang cac hanh dong duoc thuc hien tren sp do
  Action[] public actions;

  function Product(bytes32 _name, address[] _parentProducts, bytes32 _unit, uint _amount, uint[] _ratio, address handler, uint _expirydate, address _DATABASE_CONTRACT) {

    if (_expirydate <= now) {
      revert();
    }

    if (_amount <= 0) {
      revert();
    }

    DATABASE_CONTRACT = _DATABASE_CONTRACT;

    Database database = Database(DATABASE_CONTRACT);

    uint check = database.checkAccount(handler);

    if (check == 2) {
      revert();
    }

    if ((_parentProducts.length == 0) && (check == 1)) {
      if (msg.sender != handler) {
        revert();
      }
    }

    name = _name;
    parentProducts = _parentProducts;
    unit = _unit;
    amount = _amount;
    expirydate = _expirydate;
    isConsumed = false;
    owner = handler;

    Action memory creation;
    creation.description = "Product creation";
    creation.timestamp = now;
    creation.amount = _amount;

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
  function derive(bytes32 newProductsName, bytes32 unitChild, uint amountChild, uint ratioToChild, uint expirydateChild) notConsumed onlyOwner {

    uint totalSpend = amountChild * ratioToChild;

    if ((expirydateChild <= now) || (amount < totalSpend)) {
      revert();
    }

    if (amount == totalSpend) {
      isConsumed = true;
    }

    this.setAmount(this.getAmount() - totalSpend);

    Action memory action;
    action.description = "Derived";
    action.timestamp = now;

    action.amount = totalSpend;

    actions.push(action);

    Database database = Database(DATABASE_CONTRACT);

    address[] memory parentProduct = new address[](1);
    parentProduct[0] = this;

    uint[] memory ratio1 = new uint[](1);
    ratio1[0] = ratioToChild;

    address newProduct = database.createProduct(newProductsName, parentProduct, unitChild, amountChild, ratio1, owner, expirydateChild);
    childProducts.push(newProduct);

    ActionDerive(newProduct);
  }

  // lay action
  function getAction(uint idx) constant returns(string, uint, uint) {
    Action storage a = actions[idx];

    return (a.description,
      a.timestamp,
      a.amount
    );
  }

  //chuyen quyen so huu product cho ng khac
  function transferOwnership(address _newOwner, uint _amount) onlyOwner {

    if ((_newOwner == owner) || (amount < _amount) || (expirydate <= now) || (checkAcc(_newOwner) == 2) || (_amount==0)) {
      revert();
    }

    bool check = false;

    Action memory action;
    action.description = "Tranfer to new Owner";
    action.timestamp = now;
    action.amount = _amount;
    actions.push(action);

    for (uint i = 0; i < parentProducts.length; i++) {
      Product pro = Product(parentProducts[i]);
      if ((_newOwner == pro.getOwner()) && (pro.getName() == name)) {
        check = true;
        pro.setAmount(pro.getAmount() + _amount);
        this.setAmount(this.getAmount() - _amount);

        break;
      }
    }
    if (check == false) {
      address[] memory parentProduct = new address[](1);
      parentProduct[0] = this;
      uint[] memory ratio1 = new uint[](1);
      ratio1[0] = 0;

      this.setAmount(this.getAmount() - _amount);

      address newProduct = Database(DATABASE_CONTRACT).createProduct(name, parentProduct, unit, _amount, ratio1, _newOwner, expirydate);
      childProducts.push(newProduct);
    }

    if (this.getAmount() == 0) {
      this.setConsumed(true);
    }

  }

  function getExpirydate() constant returns(uint) {
    return expirydate;
  }

  // get owner
  function getOwner() constant returns(address) {
    return owner;
  }

  // lay ten sp
  function getName() constant returns(bytes32) {
    return name;
  }

  function getCountRatioPro() constant returns(uint) {
    return ratioPro.length;
  }


  function getRatioProByIdx(uint idx) constant returns(uint) {
    return ratioPro[idx];
  }

  // dem so hanh dong cua product hien tai
  function getCountAction() constant returns(uint) {
    return actions.length;
  }

  // dem so cha cua product hien tai
  function getCountParent() constant returns(uint) {
    return parentProducts.length;
  }

  //lay dia chi cha cua product theo id
  function getAddressParentByIdx(uint idx) constant returns(address) {
    return parentProducts[idx];
  }

  // so con cua product hien tai
  function getCountChild() constant returns(uint) {
    return childProducts.length;
  }

  //lay dia chi con cua product theo id
  function getAddressChildByIdx(uint idx) constant returns(address) {
    return childProducts[idx];
  }

  // lay so luong hien tai cua product
  function getAmount() constant returns(uint) {
    return amount;
  }

  // gan so luong cho product
  function setAmount(uint _amount) onlyPro {
    amount = _amount;
  }

  // check trang thai cua product da dc tieu thu het hay chua
  function getConsumed() constant returns(bool) {
    return isConsumed;
  }

  // set trang thai da tieu thu het hay chua va truong hop product bi tieu huy do mot so ly do nao do
  function setConsumed(bool _consumed) onlyPro {
    isConsumed = _consumed;
    if (isConsumed == true) this.setAmount(0);
  }

  function cancel() {
    if ((msg.sender == owner) || (msg.sender == Database(DATABASE_CONTRACT).getOwnerDB())) {
      this.setAmount(0);
      this.setConsumed(true);

      Action memory action;
      action.description = "Cancel Product";
      action.timestamp = now;
      action.amount = 0;
      actions.push(action);
    } else {
      revert();
    }
  }

  // them so luong product neu da su dung het, ap dung voi nguyen lieu tho
  function EditAmount(uint _newAmount, uint _expirydate) onlyHaveChild onlyOwner {
    if (_newAmount < 0) {
      revert();
    }
    amount = _newAmount;
    expirydate = _expirydate;

    Action memory action;
    action.description = "Edit Amount";
    action.timestamp = now;
    action.amount = _newAmount;
    actions.push(action);

    if (amount == 0) {
      isConsumed = true;
    } else {
      isConsumed = false;
    }
  }

  // Ham ket hop nhieu sp thanh mot sp
  function merge(address[] otherProducts, bytes32 newProductName, uint[] ratioToProduct, uint newProductAmount, bytes32 newProductUnit, uint expirydateChild) notConsumed {
    if ((expirydateChild <= now) || (otherProducts.length != ratioToProduct.length) || (otherProducts.length == 1)) {
      revert();
    }

    for (uint i = 0; i < otherProducts.length; i++) {
      Product pro = Product(otherProducts[i]);
      if ((pro.getOwner() != msg.sender) || (pro.getAmount() < (newProductAmount * ratioToProduct[i])) || (pro.getExpirydate() < now)) revert();
    }

    address newProduct = Database(DATABASE_CONTRACT).createProduct(newProductName, otherProducts, newProductUnit, newProductAmount, ratioToProduct, owner, expirydateChild);

    for (uint k = 0; k < otherProducts.length; k++) {
      Product pro2 = Product(otherProducts[k]);
      pro2.setAmount(pro2.getAmount() - (newProductAmount * ratioToProduct[k]));
      pro2.collaborateInMerge(newProduct, ratioToProduct[k], newProductAmount);
      if (pro2.getAmount() == 0) pro2.setConsumed(true);
      else pro2.setConsumed(false);
    }

    ActionMerge(newProduct);
  }

  function collaborateInMerge(address newProductAddress, uint ratioToProduct, uint newProductAmount) notConsumed onlyPro{
    childProducts.push(newProductAddress);

    Action memory action;
    action.description = "Collaborate in merge";
    action.timestamp = now;

    action.amount = newProductAmount * ratioToProduct;

    actions.push(action);
  }

  function checkAcc(address handler) returns(uint) {

    Database database = Database(DATABASE_CONTRACT);
    uint check = database.checkAccount(handler);
    return check;
  }

  function isContract(address addr) returns(bool) {
    uint size;
    assembly {
      size: = extcodesize(addr)
    }
    return size > 0;
  }
}

//db  0xdD16fC4C93B2B649E3D05D5B01f4478f5D4089a9
//ac2 0xba047015c42584b8Bdfb6330eC184F1e4fcB444B       db
//ac3 0xd914A3848EcaC78787B7299460E4996066ADA022       bap  raw
//ac4 0xF47B502CC5EaAD7064E2cDcF2D4E6C087a16Ecea       enclave
//ac5 0xCc80f07A28D9673eF9efC974629ba76F107D4fcd       asian raw
//ac6 0xc974e65023DED800bb0B87b27786df0D92DC5168       sioux 

//pd2   0xEb62F2908f06B36462B6F5C2E28E31C07bF71cC2   tranfer
//pd3   0x154A13ec6cF20d17383384803b7F095200aACb85   derive