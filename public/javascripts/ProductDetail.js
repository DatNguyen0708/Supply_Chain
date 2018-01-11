window.onload = function () {
    getContractAddress(function (db_contract, pro_contract, error) {
        if (error != null) {
            //setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
            console.log(error);
            throw "Cannot load contract address";
        }

        dbContract = web3.eth.contract(abiDatabase).at(db_contract);

        productContract = web3.eth.contract(abiProduct);

        console.log(web3.eth.contract(abiDatabase).at(db_contract).getCountProduct.call().toNumber());

        //console.log(web3.eth.contract(abiProduct).at("0x08e2176A37228460783a15fB5f2f6BBd5EbaAfEf").getCountChild.call().toNumber());

        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            accounts = accs;
            account = accounts[1];
        });

        showParentAndChild();

        showDetail();

        showAction();       
    });
}

function showDetail(){

    var productId = document.getElementById("address").value;

    var addressProduct = document.getElementById("addressProduct");

    var nameProduct = document.getElementById("nameProduct");

    var ownerProduct = document.getElementById("ownerProduct");

    var unitProduct = document.getElementById("unitProduct");

    var amountProduct = document.getElementById("amountProduct");

    var expirydate = document.getElementById("expirydate"); 

    var expired= document.getElementById("expired");


    addressProduct.innerHTML = productId;

    console.log(productId);

    //nameProduct = nameProduct.toUpperCase();

    nameProduct.innerHTML = web3.toUtf8(productContract.at(productId).name.call().toString()).toUpperCase();

    ownerProduct.innerHTML = productContract.at(productId).getOwner.call().toString();

    ownerProduct.setAttribute("href",/accountInformation/+productContract.at(productId).getOwner.call().toString());

    unitProduct.innerHTML = web3.toUtf8(productContract.at(productId).unit.call().toString());

    amountProduct.innerHTML = productContract.at(productId).getAmount.call().toNumber();

    expirydate.innerHTML= convertTimestamp(productContract.at(productId).expirydate.call());

    var checkboxConsumed = productContract.at(productId).isConsumed.call().toString();
    console.log(checkboxConsumed);

    if(checkboxConsumed=="true") {$("#isConsumed").prop("checked", true);}
    else {$("#isConsumed").prop("checked", false);}

    if(productContract.at(productId).expirydate.call().toNumber()<=Date.now()/1000){
        expired.innerHTML += "EXPIRED"
    }
}

function showAction(){

    var productId = document.getElementById("address").value;

    var actionCount = productContract.at(productId).getCountAction.call().toNumber();

    console.log(actionCount);

    for(var i = 0 ; i<actionCount ; i++){

        getActionById(i);

    }

    waitAndRefreshAction(actionCount);


}

function getActionById(actionId){

    var productId = document.getElementById("address").value;

    var actionById = productContract.at(productId).getAction.call(actionId);

    console.log(actionById);

    actionById[3] = actionId+1;

    listActions.push(actionById);

}

function waitAndRefreshAction(actionCount){

    console.log(listActions);


    var res = "";

        var auc = [];
            auc[0] = ["STT", "Action", "Timestamp", "Amount"];

        res = "<table border=1 id=\"listAction\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";     
            res += "<thead>"
            
            res += "<tr>";
            for(var j=0; j<=auc[0].length-1; j++){
                res += "<th>"+auc[0][j]+"</th>";
            }
            
            res += "</tr></thead><tbody>";

        for (var j = 0; j < actionCount; j++) {

            var actionId = listActions[j];

            console.log(actionId);

            console.log(actionId[0]);

            res = res + "<tr>";
            res = res + "<td>" + actionId[3] + "</td>";
            res = res + "<td>" + actionId[0] + "</td>";
            res = res + "<td>" + convertTimestamp(actionId[1]) + "</td>";
            res = res + "<td>" + actionId[2] + "</td>";
            res = res + "</tr>";
        }

        res += "</tbody><tfoot></tfoot></table>";

            document.getElementById("tableAction").innerHTML = res;
            document.getElementById("tableAction").innerHTML = document.getElementById("tableAction").innerHTML.replace(/&/g, "");
            document.getElementById("tableAction").innerHTML = document.getElementById("tableAction").innerHTML.replace(/amp;#92;/g, "\\");
            document.getElementById("tableAction").innerHTML = document.getElementById("tableAction").innerHTML.replace(/amp;/g, "&");
            document.getElementById("tableAction").innerHTML = document.getElementById("tableAction").innerHTML.replace(/lt;/g, "<");
            document.getElementById("tableAction").innerHTML = document.getElementById("tableAction").innerHTML.replace(/gt;/g, ">");

        console.log("Refreshing product!");

        $(document).ready( function () {
        //createtable();
        $('#listAction').DataTable({
            "lengthMenu": [[5, 20, 50, -1], [5, 20, 50, "All"]]
        });
         } );
    
}



function showParentAndChild() {

    var productId = document.getElementById("address").value;
   
    var countParent = productContract.at(productId).getCountParent.call().toNumber();

    var countChild = productContract.at(productId).getCountChild.call().toNumber();

    console.log(productId + " "+countParent + " " +countChild);

    for (var i = 0; i < countParent; i++) {
        getParentById(i, productId);
    }

    for (var i = 0; i < countChild; i++) {
        getChildById(i, productId);
    }

    waitAndRefreshParent(countParent, productId);

    waitAndRefreshChild(countChild);
 
}

function getParentById(parentId, productId){

    var AddressParentByIdx = productContract.at(productId).getAddressParentByIdx.call(parentId);

    console.log(AddressParentByIdx);

    parents.push(parentId+1);

    parents.push(AddressParentByIdx);

    console.log(parents);
}

function getChildById(childId, productId){

    var AddressChildByIdx = productContract.at(productId).getAddressChildByIdx.call(childId);

    console.log(AddressChildByIdx);

    childs.push(childId+1);

    childs.push(AddressChildByIdx);
    
    console.log(childs);
}

function waitAndRefreshParent(countParent, productId) {

    console.log(parents);

    var arrayRatioPro = [];

    var countRatioPro = productContract.at(productId).getCountRatioPro.call().toNumber();

    for (var i = 0; i < countRatioPro; i++) {

        var ratioProByIdx = productContract.at(productId).getRatioProByIdx.call(i);

        arrayRatioPro.push(ratioProByIdx);

        console.log(ratioProByIdx);
    }

    console.log(arrayRatioPro);




    var res = "";

        var auc = [];
            auc[0] = ["STT", "Product","Ratio", "Unit"];

        res = "<table border=1 id=\"listParent\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";     
            res += "<thead>"
            
            res += "<tr>";
            for(var j=0; j<=auc[0].length-1; j++){
                res += "<th>"+auc[0][j]+"</th>";
            }
            
            res += "</tr></thead><tbody>";

        for (var j = 0; j < countParent; j++) {
            var auc = parents[j];

            res = res + "<tr>";
            res = res + "<td>" + parents[j*2] + "</td>";
            //res = res + "<td><a href='/"+ parents[j*2+1] + "'>" + parents[j*2+1] + "</a></td>";
            res = res + "<td><a href='/"+ parents[j*2+1] + "'>" + web3.toUtf8(web3.eth.contract(abiProduct).at(parents[j*2+1]).name.call().toString()).toUpperCase() +"</a></td>";
            if(arrayRatioPro[j] ==0) res = res + "<td>" + "1" + "</td>";
            else
            res = res + "<td>" + arrayRatioPro[j] + "</td>";
            res = res + "<td>" + web3.toUtf8(web3.eth.contract(abiProduct).at(parents[j*2+1]).unit.call().toString()) + "</td>";
            res = res + "</tr>";
        }

        res += "</tbody><tfoot></tfoot></table>";

            document.getElementById("tableParent").innerHTML = res;
            document.getElementById("tableParent").innerHTML = document.getElementById("tableParent").innerHTML.replace(/&/g, "");
            document.getElementById("tableParent").innerHTML = document.getElementById("tableParent").innerHTML.replace(/amp;#92;/g, "\\");
            document.getElementById("tableParent").innerHTML = document.getElementById("tableParent").innerHTML.replace(/amp;/g, "&");
            document.getElementById("tableParent").innerHTML = document.getElementById("tableParent").innerHTML.replace(/lt;/g, "<");
            document.getElementById("tableParent").innerHTML = document.getElementById("tableParent").innerHTML.replace(/gt;/g, ">");

        console.log("Refreshing product!");

        $(document).ready( function () {
        //createtable();
        $('#listParent').DataTable({
            "lengthMenu": [[5, 20, 50, -1], [5, 20, 50, "All"]]
        });
         } );
}

function waitAndRefreshChild(countChild) {

    console.log(childs);

    console.log(countChild);

    var res = "";

        var auc = [];
            auc[0] = ["STT", "Product", "CreateAt"];

        res = "<table border=1 id=\"listChild\" class=\"table table-striped table-bordered responstable\" cellspacing=\"0\" style=\"width: 100%;color: brown;\">";     
            res += "<thead>"
            
            res += "<tr>";
            for(var j=0; j<=auc[0].length-1; j++){
                res += "<th>"+auc[0][j]+"</th>";
            }
            
            res += "</tr></thead><tbody>";

        for (var j = 0; j < countChild; j++) {

            var auc = childs[j];

            console.log(childs[j]);

            //show timestamp and ratio of each product when it have already create
            var actions = productContract.at(childs[j*2+1]).getAction.call(0);
            
            console.log(actions);

            res = res + "<tr>";
            res = res + "<td>" + childs[j*2] + "</td>";
            //res = res + "<td><a href='/"+ childs[j*2+1] + "'>" + childs[j*2+1] + "</a></td>";
            res = res + "<td><a href='/"+ childs[j*2+1] + "'>"+web3.toUtf8(web3.eth.contract(abiProduct).at(childs[j*2+1]).name.call().toString()).toUpperCase() +"</a></td>";
            res = res + "<td>" + convertTimestamp(actions[1]) + "</td>";
            //if(actions[2] ==0) res = res + "<td>" + "" + "</td>";
            //else
            //res = res + "<td>" + actions[2] + "</td>";
            res = res + "</tr>";
        }

        res += "</tbody><tfoot></tfoot></table>";

            document.getElementById("tableChild").innerHTML = res;
            document.getElementById("tableChild").innerHTML = document.getElementById("tableChild").innerHTML.replace(/&/g, "");
            document.getElementById("tableChild").innerHTML = document.getElementById("tableChild").innerHTML.replace(/amp;#92;/g, "\\");
            document.getElementById("tableChild").innerHTML = document.getElementById("tableChild").innerHTML.replace(/amp;/g, "&");
            document.getElementById("tableChild").innerHTML = document.getElementById("tableChild").innerHTML.replace(/lt;/g, "<");
            document.getElementById("tableChild").innerHTML = document.getElementById("tableChild").innerHTML.replace(/gt;/g, ">");

        console.log("Refreshing product!");

        $(document).ready( function () {
        //createtable();
        $('#listChild').DataTable({
            "lengthMenu": [[5, 20, 50, -1], [5, 20, 50, "All"]]
        });
    } );
}
