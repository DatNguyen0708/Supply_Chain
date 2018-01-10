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
        isConsumed = false;
        parentProducts = _parentProducts;
        unit =_unit;
        amount= _amount;
        //ratio=_ratio;

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


    function addAction(bytes32[] newProductsNames, bytes32[] units, uint[] amounts, uint[] ratios) notConsumed onlyOwner{
        if (newProductsNames.length != units.length || newProductsNames.length != amounts.length  || newProductsNames.length != ratios.length)
        revert();   

        uint totalSpend = 0;

        for (uint i = 0; i < amounts.length; i++) {     
          totalSpend+= amounts[i] * ratios[i];                
        }

        if (amount < totalSpend){
          revert();
        }

        if (amount > totalSpend){
          isConsumed=false;
        }

        else {
          isConsumed=true;
        }
        this.setAmount(this.getAmount() - totalSpend);

        Action memory action;
        action.description = "Add Product"; 
        action.timestamp = now;

        actions.push(action);

        Database database = Database(DATABASE_CONTRACT);

        for (uint j = 0; j < newProductsNames.length; j++) {  

          address[] memory parentProduct = new address[](1);
          parentProduct[0] = this;
          address newProduct1 = database.createProduct(newProductsNames[j], parentProduct, units[j], amounts[j],ratios[j], owner ); 
          childProducts.push(newProduct1);
        }
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

