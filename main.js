const minimumInput = document.getElementById("minimum-input");
const maximumInput = document.getElementById("maximum-input");
const tableBody = document.getElementById("table-body");

let nameVal = "";
let priceVal = 0.0;
let tableRows = [];

const legoSets = new Map();
var combinationPrices;
var approvedCombos = new Map();

var rangeMinimum;
var rangeMaxiumum;


function setRangeMin(minimum) {
    if(minimum) {
        rangeMinimum = minimum;
    } else {
        rangeMinimum = 0.0;
    }

}

function setRangeMax(maximum) {
    if (maximum) {
        rangeMaxiumum = maximum;
    } else {
        rangeMaxiumum = 500.0
    }

}

// Retrieves input from set name and set price elements.
function getInput() {
    var name = document.getElementById("nameInput");
    var price = document.getElementById("priceInput");

    nameVal = name.value;
    priceVal = price.value;

    console.log(nameVal + " " + priceVal);

    name.value = "";
    price.value = "";
}

// Saves the key pair 
function saveInput() {
    addLegoSet(nameVal, priceVal);
}

// Displays the table rows
function renderTableRows()
{
    tableBody.innerHTML = "";
    for(let [key, value] of legoSets)
    {
        var rowAsHTML = buildRow(key, value);
        tableBody.innerHTML += rowAsHTML;
    }
}

// Generates a specific table row given the name and price
function buildRow(name, price)
 {
    var string;

    var removeButton = '<button id="remove-button" onclick="remove(this)">Remove</button>'
   
    var stringHeader = '<tr class="table-row">';
    var nameData = "<td contenteditable>" + name + "</td>";
    var priceData = "<td contenteditable>" + price + "</td>";
    var placeholder = "<td>" + removeButton + "</td>";
 
    string = stringHeader;
    string += nameData;
    string += priceData;
    string += placeholder;
    string += "</tr>";

    return string;
 }

 // Called directly to remove a table row
function remove(elem) {
    var thisTableRow = elem.parentNode.parentNode;
    var rowChildElements = thisTableRow.children;

    if (rowChildElements) {
        deletingName = rowChildElements[0].textContent;
        legoSets.delete(deletingName);
    }
    console.log(legoSets);
    thisTableRow.remove();
}

function addLegoSet(name, price) {
    legoSets.set(name, price);
}

function getKeys() {
    let keyArray = Array.from(legoSets.keys());
    return keyArray;
}

// Sourced from https://www.tutorialspoint.com/finding-power-set-for-a-set-in-javascript-power-set
function computePowerSet(legoSets) {
    const powerSet = (arr = []) => {
       const res = [];
       const { length } = arr;
       const numberOfCombinations = 2 ** length;
       for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
          const subSet = [];
          for (let setElementIndex = 0; setElementIndex < arr.length;
          setElementIndex += 1) {
             if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(arr[setElementIndex]);
             };
          };
          res.push(subSet);
       };
       return res;
    };
    return powerSet(legoSets);
}

// Makes key pairs of a combination of lego sets and their total price
function mapComboPrices(powerSet) {
    console.log(powerSet);
    var comboPrices = new Map();
    for(i in powerSet) {
        comboPrices.set(powerSet[i],  getComboPrice(powerSet[i]));
    }
    
    return comboPrices;
}

// Adds and returns the prices of a combination of lego sets
function getComboPrice(combo) {
    var comboTotal = 0.0;
    for(i in combo) {
        console.log(legoSets.get(combo[i]));
        comboTotal += parseFloat(legoSets.get(combo[i]));
    }
    console.log("Total price for this combo is" + comboTotal)
    return Math.round((comboTotal + Number.EPSILON) * 100) / 100;
}

// Called whenever a new table row is being added
function main() {
    getInput();
    saveInput();
    renderTableRows();
}

// Called whenever the user wants to calculate their desired combinations
function calculate() {
    console.log("Printing Lego Sets");
    console.log(legoSets);
    
    setRangeMin(minimumInput.value);
    setRangeMax(maximumInput.value);

    const set = getKeys();
    const powerSet = computePowerSet(set);
    combinationPrices = mapComboPrices(powerSet);
    console.log(combinationPrices);
    
    approvedCombos.clear();
    combinationPrices.forEach(logMapElements);
    console.log(approvedCombos);

    displayApprovedCombos();
    
}

// Helper method for getting the combos within the budget range
function logMapElements(value, key, map) {
    if (value >= rangeMinimum && value <= rangeMaxiumum) {
        approvedCombos.set(key, value);
    }
}

// Helper method for adding the approved combos to HTML
function displayApprovedCombos() {
    const comboOutput = document.getElementById("combo-output");
    comboOutput.innerHTML = "";
    comboOutput.innerHTML = "<p>";
    for (let [key, value] of approvedCombos) {
        var output = key + " = " + value + '<br>';
        comboOutput.innerHTML += output;
    }
    comboOutput.innerHTML += "</p>"
}

