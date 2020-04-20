let log = console.log;

//  User - class of a single user
// constructor of class User
let User = function(name, money) {
    this.name = name;
    this.money = money;
}

//  array of total users
let totalUsers = [];

//  amount in the amount
let totalAmount = 0;

// to be used in changeEvent func
let totalLeft = 0;

// to be used in submitAmount
let equalAmount = 0;

//  array of passedValue by the user into the unequally part
let arrayOfUserInput = [];


setAmount = (r) => {
  try {
    totalAmount = r.value;
    log("r.value - " + r.value + " totalAmount - " + totalAmount);
    totalLeft = totalAmount;
} catch(err) {
      alert(`Error: ${err}`);
  }
}


// try {
//   adddlert("Welcome guest!");
// }
// catch(err) {
//   alert(err.message);
// }

// adds users to the table
addUser = (e) => {
    try {
    e = e || window.event;
    let key = e.keyCode;
    if (key == 13) //Enter
    {
        let uname = document.forms["addUserForm"]["uname"].value;
        let displayTable = document.getElementById("displayTable");

        // try-catch block for a part of validation
        try {
            if (!(isNaN(uname))) throw "is a number!";
        } catch (err) {
            alert(uname + " " + err + " Please enter only alphabets.");
            return false;
        }

        // validation
        if (uname == "") {
            alert("userName can't be empty !");
            return false;
        }


        if (uname.length > 15) {
            alert("The length of userName should be less than 16 characters !");
            return false;
        }

        // let unameR = /^[A-Za-z\s]+$/;
        // if(unameR.test(uname)==false){
        //     alert("Enter only alphabets in userName !");
        //     return false;
        // }
        else { //  creates newRow for each user
            let newRow = displayTable.insertRow();
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);

            let user = new User(uname, 0);
            cell1.innerHTML = user.name;
            cell2.innerHTML = user.money;

            console.log(user);
            totalUsers.push(user)
            console.log(totalUsers);

            //  add users as options to paidBySelect tag
            let paidBySelect = document.getElementById("paidBySelect");
            paidBySelect.options[paidBySelect.options.length] = new Option(uname);


            document.getElementById('name').value = '';
            e.preventDefault(); //   The preventDefault() method cancels the event if it is cancelable,
            // meaning that the default action that belongs to the event will not occur.
            return true;
        }

    } // EnterKey if ends
} catch(err) {
      alert(`Error: ${err}`);
  }
}


// splits the ammount amoung all the users
submitAmount = (r) => {
  try {  
    let desc = document.forms["submitAmountForm"]["desc"].value;
    let amount = document.forms["submitAmountForm"]["amount"].value;
    // let amount = document.forms["submitAmountForm"]["amount"].value;

    console.log("totalAmount - " + totalAmount);

    let splitFormTable = document.getElementById("splitFormTable");
    let divideSelect = document.getElementById("divideSelect");
    //  the selected option by the user
    let selectedOption = divideSelect.options[divideSelect.selectedIndex].value;


    if (selectedOption == 'equally') {

        let flag = validationSubmitForm(desc, amount);
        if (flag == false) {
            return false;
        }

        let i = r.parentNode.parentNode.rowIndex;
        equalAmount = amount / (totalUsers.length);

        for (let j = (totalUsers.length - 1); j >= 0; j--) {

            let newRow = splitFormTable.insertRow(i + 1);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);

            cell1.innerHTML = totalUsers[j].name;
            cell2.innerHTML = equalAmount;
        }
    }

    // if (selectedOption == 'unequally')
    else {

        let flag = validationSubmitForm(desc, amount);
        if (flag == false) {
            return false;
        }

        let i = r.parentNode.parentNode.rowIndex;
        let count = totalUsers.length;

        for (let j = (totalUsers.length - 1); j >= 0; j--) {

            let newRow = splitFormTable.insertRow(i + 1);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);

            cell1.innerHTML = totalUsers[j].name;
            cell2.innerHTML = "<input id='userInput' type='number' onchange='changeEvent(this)'>";
        }

        let newRow = splitFormTable.insertRow(i + count + 1);
        newRow.innerHTML = "<p id='updateLeft'></p>";
    }  
    } catch(err) {
      alert(`Error: ${err}`);
  }  
}

// this gets called everytime, when amount is entered for each user
let localCount = 0;

changeEvent = (r) => {
  try {  

    let updateLeft = document.getElementById('updateLeft');
    let passedValue = parseInt(r.value);
    log("totalAmount - " + totalAmount + ", " + "totalLeft - " + totalLeft);


    // validation for the splitFormDiv
    if (passedValue < 0) {
        alert("The amount entered should be positive only !");
        return false;
    }

    if (totalLeft < 0) {
        alert("The amount left should not be negative !");
        return false;
    }

    if (passedValue > totalAmount) {
        alert("The amount entered should be less than the totalAmount !");
        return false;
    }

    if (passedValue > totalLeft) {
        alert("The amount entered should be less than the amount left !");
        return false;
    } else {
        if ((localCount) == totalUsers.length) {
            if (totalLeft != 0) {
                alert("Error : The math for this expense doesn't add up !")
            }
        } else {
            totalLeft -= passedValue;
            updateLeft.innerHTML = totalLeft + " left of " + totalAmount;
            arrayOfUserInput.push(parseInt(passedValue)); //  pushing the passedValue to make its array
            localCount++;
        }
    }
} catch(err) {
      alert(`Error: ${err}`);
  }
}


// form validation
validationSubmitForm = (desc, amount) => {
  try {  
    if (desc == "" || amount == "") {
        alert("Please fill all the fields !");
        return false;
    }

    let descSplCharsR = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g;
    if (descSplCharsR.test(desc) == false) {
        alert("No Special characters allowed in the Description !");
        return false;
    }

    let amountR = /^[0-9]+$/;
    if (amountR.test(amount) == false) {
        alert("Enter only numerals in amount !");
        return false;
    }

    if (amount <= 0) {
        alert("Amount entered should be greater than ZERO !");
        return false;
    }
} catch(err) {
      alert(`Error: ${err}`);
  }
}

let temp;
// updates expenses for all the users respectively
addExpense = () => { 
  try {
    let desc = document.forms["submitAmountForm"]["desc"].value;
    let amount = document.getElementById("amount");
    temp = amount.value;
    let divideSelect = document.getElementById("divideSelect");
    let selectedOption = divideSelect.options[divideSelect.selectedIndex].value;
    let paidBySelect = document.getElementById("paidBySelect");
    let paidBy = paidBySelect.options[paidBySelect.selectedIndex].value;


    if (selectedOption == 'equally') {

        for (let i = 0; i < totalUsers.length; i++) {

            if (paidBy == totalUsers[i].name) {
                totalUsers[i].money = totalUsers[i].money + (amount.value - equalAmount);
            } else {
                totalUsers[i].money -= equalAmount;
            }
        }
        log(totalUsers);
        updateUserTable();
    }

    // if(selectedOption == 'unequally')
    else {
        log(arrayOfUserInput);
        for (let i = 0; i < totalUsers.length; i++) {
            if (paidBy == totalUsers[i].name) {
                totalUsers[i].money = totalUsers[i].money + (amount.value - arrayOfUserInput[i]);
            } else {
                totalUsers[i].money -= arrayOfUserInput[i];
            }
        }
        updateUserTable();
    }


    //  resets the splitForm
    let frm = document.getElementById("submitAmountForm");
    frm.reset();

        // promise
        let myPromise = new Promise((resolve, reject) => {
          setTimeout( function() {
            resolve("Expense added successfully!")
          }, 1000)
        })

        myPromise.then((successMessage) => {
          try {
            alert(`${successMessage}
                \nDescription: ${desc}\nAmount: ${temp}\nDistributed as: ${selectedOption}\nPaid By: ${paidBy}`);
        } catch(err) {
            alert(`Error: ${err}`);
        }
        })    
    } catch(err) {
      alert(`Error: ${err}`);
  }
}


// updates the expenses in the displayTable
updateUserTable = () => {
  try {  
    let displayTable = document.getElementById("displayTable");
    let splitFormTable = document.getElementById("splitFormTable");
    log(displayTable.rows[1].childNodes[1].innerHTML);
    let selectedOption = divideSelect.options[divideSelect.selectedIndex].value;

    //  updates displayTable with data    
    for (let i = 1; i <= totalUsers.length; i++) {
        displayTable.rows[i].childNodes[1].innerHTML = totalUsers[i - 1].money;
    }

    //  deletes User rows added after SplitAmount event
    if (selectedOption == 'equally') {
        for (let i = (totalUsers.length - 1); i >= 0; i--) {
            log(splitFormTable.rows[3 + i]);
            let j = splitFormTable.deleteRow(3 + i);
        }
    }

    //  if(selectedOption == 'unequally')
    else {
        for (let i = (totalUsers.length - 1) + 1; i >= 0; i--) {
            log(splitFormTable.rows[3 + i]);
            let j = splitFormTable.deleteRow(3 + i);
        }
    }
} catch(err) {
      alert(`Error: ${err}`);
  }
}