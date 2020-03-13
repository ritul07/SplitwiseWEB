var log = console.log;

//	class of a single user
var User=function(name,money){
	this.name = name;
	this.money = money;
}

//	array of total users
var totalUsers = [];

//  amount in the amount
var totalAmount = 0;

// to be used in changeEvent func
var totalLeft = 0;

// to be used in submitAmount
var equalAmount = 0;

//  array of passedValue by the user into the unequally part
var arrayOfUserInput = [];


function setAmount(r){
    totalAmount = r.value;
    log("r.value - " + r.value + " totalAmount - " + totalAmount);
    totalLeft = totalAmount;
}



function addUser(e){
  e=e||window.event;
  var key = e.keyCode;
  if(key==13) //Enter
  {
	var uname = document.forms["addUserForm"]["uname"].value;
	var displayTable=document.getElementById("displayTable");

    if(uname == ""){
        alert("userName can't be empty !");
        return false;        
    }


    if(uname.length > 15){
        alert("The length of userName should be less than 16 characters !");
        return false;
    }

    var unameR = /^[A-Za-z\s]+$/;
    if(unameR.test(uname)==false){
        alert("Enter only alphabets in userName !");
        return false;
    }



    else{
                var newRow = displayTable.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);

                var user=new User(uname,0);
                cell1.innerHTML = user.name;
                cell2.innerHTML = user.money;

                console.log(user);
                totalUsers.push(user)
                console.log(totalUsers);

    //  add options to paidBySelect tag
    var paidBySelect = document.getElementById("paidBySelect");
    paidBySelect.options[paidBySelect.options.length] = new Option(uname);


    document.getElementById('name').value = '';
    e.preventDefault();//   The preventDefault() method cancels the event if it is cancelable,
                        // meaning that the default action that belongs to the event will not occur.
    return true;
    }

}// EnterKey if ends
    
}



function submitAmount(r){
    var desc = document.forms["submitAmountForm"]["desc"].value;
    var amount = document.forms["submitAmountForm"]["amount"].value;    
    // var amount = document.forms["submitAmountForm"]["amount"].value;

    console.log("totalAmount - " + totalAmount);

    var splitFormTable = document.getElementById("splitFormTable");
    var divideSelect = document.getElementById("divideSelect");
    //  to select the selected option by the user
    var selectedOption = divideSelect.options[divideSelect.selectedIndex].value;


    if(selectedOption == 'equally'){

        var flag=validationSubmitForm(desc,amount);
        if(flag==false){
            return false;
        }

        var i = r.parentNode.parentNode.rowIndex;
        equalAmount = amount/(totalUsers.length);

        for(var j=(totalUsers.length - 1); j>=0; j--){

            var newRow = splitFormTable.insertRow(i+1);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);

            cell1.innerHTML = totalUsers[j].name;
            cell2.innerHTML = equalAmount;
        }
    }

// if (selectedOption == 'unequally')
    else{

        var flag=validationSubmitForm(desc,amount);
        if(flag==false){
            return false;
        }
        
        var i = r.parentNode.parentNode.rowIndex;
        var count = totalUsers.length;

        for(var j=(totalUsers.length - 1); j>=0; j--){

            var newRow = splitFormTable.insertRow(i+1);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);  
            
            cell1.innerHTML = totalUsers[j].name;
            cell2.innerHTML = "<input id='userInput' type='number' onchange='changeEvent(this)'>";
        }

        var newRow = splitFormTable.insertRow(i+count+1);
        newRow.innerHTML = "<p id='updateLeft'></p>";
    }

}


var localCount = 0;
function changeEvent(r){
    
    var updateLeft = document.getElementById('updateLeft');   
    var passedValue = parseInt(r.value);
    log("totalAmount - " + totalAmount + ", " + "totalLeft - " + totalLeft);


        if(passedValue < 0){
            alert("The amount entered should be positive only !");
            return false;
        }

        if(totalLeft < 0){
            alert("The amount left should not be negative !");
            return false;
        }

        if(passedValue > totalAmount){
            alert("The amount entered should be less than the totalAmount !");
            return false;
        }

        if(passedValue > totalLeft){
            alert("The amount entered should be less than the amount left !");
            return false;
        }        


        else{
            if((localCount) == totalUsers.length){
                if(totalLeft != 0){
                    alert("Error : The math for this expense doesn't add up !")
                }
            }

            else{
            totalLeft -= passedValue;
            updateLeft.innerHTML = totalLeft + " left of " + totalAmount;
            arrayOfUserInput.push(parseInt(passedValue)); //  pushing the passedValue to make its array
            localCount++;
            }
        }
}



function validationSubmitForm(desc, amount){
    if(desc=="" ||amount=="")
    {
        alert("Please fill all the fields !");
        return false;
    }

    // var descR = /^[0-9a-zA-Z\s]+$/;
    // if(descR.test(desc)==false)
    // {
    //     alert("Enter only alphanumeric in the Description !");
    //     return false;
    // }

    var descSplCharsR = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g;
    if(descSplCharsR.test(desc)==false){
        alert("No Special characters allowed in the Description !");
        return false;
    }     

    var amountR = /^[0-9]+$/;
    if(amountR.test(amount)==false)
    {
        alert("Enter only numerals in amount !");
        return false;
    }

    if(amount <=  0)
    {
        alert("Amount entered should be greater than ZERO !");
        return false;
    }        

}



function addExpense(){
    var amount =  document.getElementById("amount");
    log('amount.value - ' + amount.value);
    var divideSelect = document.getElementById("divideSelect");
    var selectedOption = divideSelect.options[divideSelect.selectedIndex].value;
    var paidBySelect = document.getElementById("paidBySelect");
    var paidBy = paidBySelect.options[paidBySelect.selectedIndex].value;


    if(selectedOption == 'equally'){

        for(var i=0; i<totalUsers.length; i++){

            if(paidBy == totalUsers[i].name){
                totalUsers[i].money = totalUsers[i].money + (amount.value - equalAmount);
            }

            else{
                totalUsers[i].money -= equalAmount;
            }
        }
        log(totalUsers);
        updateUserTable();
    }

// if(selectedOption == 'unequally')
    else{
        log(arrayOfUserInput);
        for(var i=0; i<totalUsers.length; i++){
            if(paidBy == totalUsers[i].name){
                totalUsers[i].money = totalUsers[i].money + (amount.value - arrayOfUserInput[i]);
            }

            else{
                totalUsers[i].money -= arrayOfUserInput[i];
            }
        }
        updateUserTable();
    }


    //  resets the splitForm
     var frm=document.getElementById("submitAmountForm");
     frm.reset();
}



function updateUserTable(){
    var displayTable = document.getElementById("displayTable");
    var splitFormTable = document.getElementById("splitFormTable");
    log(displayTable.rows[1].childNodes[1].innerHTML);
    var selectedOption = divideSelect.options[divideSelect.selectedIndex].value;

//  updates displayTable with data    
    for(var i=1; i<=totalUsers.length; i++){
        displayTable.rows[i].childNodes[1].innerHTML = totalUsers[i-1].money;
    }

//  deletes User rows added after SplitAmount event
    if(selectedOption == 'equally'){
        for(var i=(totalUsers.length - 1); i>=0; i--){
            log(splitFormTable.rows[3+i]);
            var j = splitFormTable.deleteRow(3+i);             
        }
    }

    //  if(selectedOption == 'unequally')
    else{
        for(var i=(totalUsers.length - 1)+1; i>=0; i--){
            log(splitFormTable.rows[3+i]);
            var j = splitFormTable.deleteRow(3+i);             
        }        
    }
}