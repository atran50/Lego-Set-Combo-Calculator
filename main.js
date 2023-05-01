
const legoSets = new Map();
var combinationPrices;
var approvedCombos = new Array();

var rangeMinimum;
var rangeMaxiumum;

setRangeMin(150);
setRangeMax(158.99);
addLegoSet("Endor", 79.99);
addLegoSet("Throne Room", 99.99);
addLegoSet("Interceptor", 99.99);
addLegoSet("Keychain", 5.99);
addLegoSet("Bomber", 64.99);

//const set = ['x', 'y', 'z'];
const set = getKeys();
const powerSet = computePowerSet(set);
combinationPrices = mapComboPrices(powerSet);
console.log(combinationPrices);
//filterWithinRange(combinationPrices);

combinationPrices.forEach(logMapElements);
console.log(approvedCombos);

function logMapElements(value, key, map) {
    if (value >= rangeMinimum && value <= rangeMaxiumum) {
        approvedCombos.push(key);
    }
    //console.log(`m[${key}] = ${value}`);
  }

function setRangeMin(minimum) {
    rangeMinimum = minimum;
}

function setRangeMax(maximum) {
    rangeMaxiumum = maximum;
}

function addLegoSet(name, price) {
    legoSets.set(name, price);
}

function getKeys() {
    let keyArray = Array.from(legoSets.keys());
    return keyArray;
}

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

function mapComboPrices(powerSet) {
    console.log(powerSet);
    var comboPrices = new Map();
    for(i in powerSet) {
        comboPrices.set(powerSet[i],  getComboPrice(powerSet[i]));
    }
    return comboPrices;
}

function getComboPrice(combo) {
    var comboTotal = 0;
    for(i in combo) {
        comboTotal += legoSets.get(combo[i]);
    }
    return Math.round((comboTotal + Number.EPSILON) * 100) / 100;
}

/*
function filterWithinRange(comboPrices) {
    const iterator = comboPrices.entries();
    while(iterator.hasNext())
    {
        console.log(iterator.next().value());
    }
}
*/

