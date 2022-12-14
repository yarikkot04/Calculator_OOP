import { Menu } from "./menu.js";
import { Calculator, HexCalculator, BinCalculator } from './calculator.js'

const decCalc = document.querySelector('#calculatorDec');
const hexCalc = document.querySelector('#calculatorHex');
const binCalc = document.querySelector('#calculatorBin');
let mode;
let checkedD = false;
let checkedH = false;
let checkedB = false;
let selected = [];
const calculatorDec = new Calculator(decCalc);
const calculatorHex = new HexCalculator(hexCalc);
const calculatorBin = new BinCalculator(binCalc);
const calcArr = [decCalc, hexCalc, binCalc];
const menu = document.querySelector('.menu');
const btnMenu = document.querySelector('#text');
let closeStatus = false;
const objMenu = new Menu();
objMenu.setModes({ 0: 'Decimal calculator', 1: 'Hexadecimal calculator', 2: 'Binary calculator' });
objMenu.buildMenu(menu);
let menuFields = document.querySelectorAll('.menuField');
btnMenu.addEventListener('click', (event) => {
  if (!closeStatus) {
    menu.setAttribute('close', 'true');
    closeStatus = true;
    objMenu.clearMenu(menu);
  } else {
    menu.setAttribute('close', 'false');
    closeStatus = false;
    objMenu.buildMenu(menu);
  }
});
checkMode(0);
for (let key of Array.from(menuFields)) {
  key.addEventListener('click', (event) => {
    if(selected[0] != key ){
      if(selected.length >= 1){
        selected.unshift(key);
      }
      selected.push(key);
      mode = objMenu.chooseMode(event.currentTarget, calcArr);
      checkMode(mode);
      for (let key of Array.from(menuFields)){
        key.addEventListener('click', (event) => {
          calculatorDec.rebootCalc();
          calculatorHex.rebootCalc();
          calculatorBin.rebootCalc();
        })
      }
      key.removeAttribute('selected');
    }
  });
};
function checkMode(mode) {
  if (mode == 0) {
    if (!checkedD) {
      calculatorDec.onclickBtn();
      calculatorDec.clear();
      calculatorDec.clearLast();
      calculatorDec.onclickDot();
      calculatorDec.plus();
      calculatorDec.minus();
      calculatorDec.mult();
      calculatorDec.division();
      calculatorDec.showResult();
      calculatorDec.brackets();
      calculatorDec.toFraction();
      calculatorDec.changeSign();
      checkedD = true;
    };
  } else if (mode == 1) {
    if (!checkedH) {
      calculatorHex.onclickBtn();
      calculatorHex.clear();
      calculatorHex.clearLast();
      calculatorHex.onclickDot();
      calculatorHex.plus();
      calculatorHex.minus();
      calculatorHex.mult();
      calculatorHex.division();
      calculatorHex.showResult();
      calculatorHex.brackets();
      calculatorHex.toFraction();
      calculatorHex.changeSign();
      checkedH = true;
    };
  } else {
    if (!checkedB) {
      calculatorBin.onclickBtn();
      calculatorBin.clear();
      calculatorBin.clearLast();
      calculatorBin.onclickDot();
      calculatorBin.plus();
      calculatorBin.minus();
      calculatorBin.mult();
      calculatorBin.division();
      calculatorBin.showResult();
      calculatorBin.brackets();
      calculatorBin.toFraction();
      calculatorBin.changeSign();
      checkedB = true;
    };
  };
};

