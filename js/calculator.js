export class Calculator {
  _counter = 1;
  #rebootStat = false;
  _actionLast = false;
  _dotIs = false;
  #result = 0;
  #endNum = true;
  _countOpenBracket = 0;
  _countCloseBracket = 0;
  _lastNumPositive = true;
  _tmp;
  _lastFraction = false;
  _actionSignLast = false;

  constructor(obj) {
    this.calculator = obj;
  }
  _actionConf(arg) {
    if (this.calculator.children[0].children[0].textContent.endsWith('/')) return;
    if (!this._actionLast) {
      this.calculator.children[0].children[0].textContent += arg.innerHTML;
      this._lastFraction = false;
      this._counter += 1;
      this._actionLast = true;
      this._dotIs = false;
      this._lastNumPositive = true;
      this._actionSignLast = false;
    } else {
      if (this.calculator.children[0].children[0].textContent.slice(-1) == '(') return;
      if (this.calculator.children[0].children[0].textContent.slice(-1) == ')') return;
      let inputVal = this.calculator.children[0].children[0].textContent.slice(0, -1);
      let lastSign = arg.innerHTML;
      this.calculator.children[0].children[0].textContent = inputVal + lastSign;
      this._actionLast = true;
      this._dotIs = false;
      this._lastNumPositive = true;
      this._actionSignLast = false;
    };
  };
  _onClickBtnFontConf(arg) {
    if (this.calculator.children[0].children[0].textContent.slice(-1) == ')') {
      this.calculator.children[0].children[0].textContent += '×' + arg.innerHTML;
      this._actionLast = false;
      this.#endNum = true;
      this._counter += 1;
      this._lastNumPositive = true;
    } else {
      this.calculator.children[0].children[0].textContent += arg.innerHTML;
      this._actionLast = false;
      this.#endNum = true;
      this._counter += 1;
      this._lastNumPositive = true;
    }
  };
  _clearLastFontConf() {
    if (this.calculator.children[0].children[0].textContent.slice(-1) == ')') {
      --this._countCloseBracket;
    };
    if (this.calculator.children[0].children[0].textContent.slice(-1) == '(') {
      --this._countOpenBracket;
    };
    if (this.calculator.children[0].children[0].textContent.slice(-1) == '.') {
      this._dotIs = false;
    };
    this.calculator.children[0].children[0].textContent = this.calculator.children[0].children[0].textContent.slice(0, -1);
    this._counter -= 1;
    if (!isNaN(+this.calculator.children[0].children[0].textContent.slice(-1))) {
      this._actionLast = false;
    };
    this._lastNumPositive = true;
    this._tmp;
  };
  _fontСonfigurationInRes() {
    if (this.calculator.children[0].children[0].textContent.length <= 6) {
      if (this.calculator.children[0].children[0].textContent.slice(-1) == '.') {
        this._dotIs = false;
      };
      this._counter = this.calculator.children[0].children[0].textContent.length;
      this.calculator.children[0].children[0].style.fontSize = '3.5rem';
    } else if (this.calculator.children[0].children[0].textContent.length <= 10) {
      if (this.calculator.children[0].children[0].textContent.slice(-1) == '.') {
        this._dotIs = false;
      };
      this._counter = this.calculator.children[0].children[0].textContent.length;
      this.calculator.children[0].children[0].style.fontSize = '2rem';
    } else if (this.calculator.children[0].children[0].textContent.length <= 24) {
      if (this.calculator.children[0].children[0].textContent.slice(-1) == '.') {
        this._dotIs = false;
      };
      this._counter = this.calculator.children[0].children[0].textContent.length;
      this.calculator.children[0].children[0].style.fontSize = '1.5rem';
    };
  };
  _resetTostart() {
    this._actionLast = false;
    this._counter = this.calculator.children[0].children[0].textContent.length;
    if (this.calculator.children[0].children[0].textContent.includes('.')) {
      this._dotIs = true;
    } else {
      this._dotIs = false;
    }
    this._countOpenBracket = 0;
    this._countCloseBracket = 0;
    this._lastNumPositive = true;
    this._lastFraction = false;
    this._actionSignLast = false;
    this._tmp;
  };
  rebootCalc() {
    if (!this.#rebootStat) {
      if (this.calculator.children[0].children[0].textContent.length == 1) {
        this._counter = 1;
        this.#rebootStat = true;
      };
    } else {
      this.#rebootStat = false;
    };
    this.calculator.children[0].children[0].style.fontSize = '3.5rem';
    this.calculator.children[0].children[0].textContent = '0';
    this._actionLast = false;
    this._counter = 1;
    this._countOpenBracket = 0;
    this._countCloseBracket = 0;
    this._lastNumPositive = true;
    this._lastFraction = false;
    this._dotIs = false;
    this._actionSignLast = false;
    this._tmp;
  };
  onclickBtn() {
    const btnMenu = document.querySelectorAll('.number');
    for (let key of Array.from(btnMenu)) {
      key.addEventListener('click', () => {
        if (this.calculator.children[0].children[0].textContent == '0') {
          this.calculator.children[0].children[0].textContent = key.innerHTML;
          this.#endNum = true;
          this._actionLast = false;
          this._lastNumPositive = true;
        } else if (this._counter <= 6) {
          this.calculator.children[0].children[0].style.fontSize = '3.45rem';
          this._onClickBtnFontConf(key);
        } else if (this._counter <= 11) {
          this.calculator.children[0].children[0].style.fontSize = '2.05rem';
          this._onClickBtnFontConf(key);
        } else if (this._counter <= 24) {
          this.calculator.children[0].children[0].style.fontSize = '1.45rem';
          this._onClickBtnFontConf(key);
        }
      })
    }
  };
  onclickDot() {
    const dotMenu = document.querySelectorAll('.dott');
    for (let key of Array.from(dotMenu)) {
      key.addEventListener('click', () => {
        if (this.calculator.children[0].children[0].textContent.endsWith('.')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith(')')) return;
        if (this._actionLast) return;
        if (this._dotIs) return;
        this.calculator.children[0].children[0].textContent += key.innerHTML;
        this._dotIs = true;
      })
    }
  };
  clear() {
    const clearBtn = document.querySelectorAll('.bclear');
    for (let key of Array.from(clearBtn)) {
      key.addEventListener('click', () => {
        this.calculator.children[0].children[0].style.fontSize = '3.5rem';
        this.calculator.children[0].children[0].textContent = '0';
        this._actionLast = false;
        this._counter = 1;
        this._countOpenBracket = 0;
        this._countCloseBracket = 0;
        this._lastNumPositive = true;
        this._lastFraction = false;
        this._dotIs = false;
        this._actionSignLast = false;
        this._tmp;
      });
    }
  };
  clearLast() {
    const clearLastBtn = document.querySelectorAll('.bclear-last');
    for (let key of Array.from(clearLastBtn)) {
      key.addEventListener('click', () => {
        if (this.calculator.children[0].children[0].textContent == '0') {
          this.calculator.children[0].children[0].textContent = '0'
        } else if (this.calculator.children[0].children[0].textContent.length == 1) {
          this.calculator.children[0].children[0].textContent = '0';
        }
        else {
          if (this._counter <= 10) {
            if (this.calculator.children[0].children[0].textContent == '0') {
              this._actionLast = false;
              this._counter = 1;
              this._countOpenBracket = 0;
              this._countCloseBracket = 0;
              this._lastNumPositive = true;
              this._lastFraction = false;
              this._dotIs = false;
              this._actionSignLast = false;
              this._tmp;
            }
            this.calculator.children[0].children[0].style.fontSize = '3.45rem';
            this._clearLastFontConf();
          } else if (this._counter <= 15) {
            this.calculator.children[0].children[0].style.fontSize = '2.05rem';
            this._clearLastFontConf();
          } else if (this._counter <= 29) {
            this.calculator.children[0].children[0].style.fontSize = '1.45rem';
            this._clearLastFontConf();
          }
        }
      })
    }
  };
  plus() {
    const btnPlus = document.querySelectorAll('.plus');
    for (const key of btnPlus) {
      key.addEventListener('click', () => {
        this._actionConf(key);
      });
    };
  };
  minus() {
    const btnMinus = document.querySelectorAll('.minus');
    for (const key of btnMinus) {
      key.addEventListener('click', () => {
        this._actionConf(key);
      })
    }
  };
  mult() {
    const btnMult = document.querySelectorAll('.mult');
    for (const key of btnMult) {
      key.addEventListener('click', () => {
        this._actionConf(key);
      })
    }
  };
  division() {
    const btnDivision = document.querySelectorAll('.division');
    for (const key of btnDivision) {
      key.addEventListener('click', () => {
        this._actionConf(key);
      })
    }
  };
  changeSign() {
    const sign = document.querySelectorAll('.plus-minus');
    for (const key of sign) {
      key.addEventListener('click', () => {
        let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
          .replaceAll('-', '|')
          .replaceAll('×', '|')
          .replaceAll('÷', '|')
          .replaceAll('(', '|');
        let inputValArr = inputVal.split('|');
        let lastNum = inputValArr[inputValArr.length - 1];
        let inputFieldStart = this.calculator.children[0].children[0].textContent.slice(0, -lastNum.length);
        if (this._actionLast) return;
        if (inputVal.endsWith('|')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith('/')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith('(')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith(')')) return;
        if (this._lastNumPositive) {
          this.calculator.children[0].children[0].textContent = inputFieldStart + `(-${lastNum}`;
          ++this._countOpenBracket;
          this._counter += 2;
          this._lastNumPositive = false;
          this._dotIs = false;
        } else if (!this._lastNumPositive) {
          let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
            .replaceAll('-', '|')
            .replaceAll('×', '|')
            .replaceAll('÷', '|')
            .replaceAll('(', '|');
          let inputValArr = inputVal.split('|');
          let lastNum = inputValArr[inputValArr.length - 1];
          let inputFieldStart = this.calculator.children[0].children[0].textContent.slice(0, -(lastNum.length + 2));
          let lastVal = this.calculator.children[0].children[0].textContent.slice(inputFieldStart.length);
          this.calculator.children[0].children[0].textContent = inputFieldStart + lastVal.replace('(-', '');
          this._counter -= 2;
          --this._countOpenBracket;
          this._dotIs = false;
          this._lastNumPositive = true;
        };
      })
    }
  };
  toFraction() {
    const fraction = document.querySelectorAll('.fraction');
    for (const key of fraction) {
      key.addEventListener('click', () => {
        if (!this._actionSignLast) {
          if (this.calculator.children[0].children[0].textContent == '0') return;
          if (this.calculator.children[0].children[0].textContent == '1') return;
          let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
            .replaceAll('-', '|')
            .replaceAll('×', '|')
            .replaceAll('÷', '|')
            .replaceAll('(', '|');
          let inputValArr = inputVal.split('|');
          let lastNum = inputValArr[inputValArr.length - 1];
          let inputFieldStart = this.calculator.children[0].children[0].textContent.slice(0, -lastNum.length);
          if (this.calculator.children[0].children[0].textContent.endsWith('/')) return;
          if (this.calculator.children[0].children[0].textContent.endsWith('(')) return;
          if (this.calculator.children[0].children[0].textContent.endsWith(')')) return;
          if (this._actionLast) return;
          if (!this._lastFraction) {
            this.calculator.children[0].children[0].textContent = inputFieldStart + `1/${lastNum}`;
            this._dotIs = true;
            this._counter += 2;
            this._lastFraction = true;
          } else if (this._lastFraction) {
            let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
              .replaceAll('-', '|')
              .replaceAll('×', '|')
              .replaceAll('÷', '|')
              .replaceAll('(', '|');
            let inputValArr = inputVal.split('|');
            let lastNum = inputValArr[inputValArr.length - 1];
            let currVal = this.calculator.children[0].children[0].textContent.slice(0, -lastNum.length);
            let lastVal = this.calculator.children[0].children[0].textContent.slice(-lastNum.length);
            this.calculator.children[0].children[0].textContent = currVal + lastVal.replace('1/', '');
            this._dotIs = false;
            this._counter -= 2;
            this._lastFraction = false;
          }
        }
      })
    }
  };
  showResult() {
    const equal = document.querySelector('.equal');
    equal.addEventListener('click', () => {
      let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|').replaceAll('×', '|').replaceAll('-', '|');
      if (inputVal.includes('÷0|')) return;
      if (inputVal.endsWith('÷0')) return;
      this.#result = new Function(`return ${this.calculator.children[0].children[0].textContent.replaceAll('×', '*').replaceAll('÷', '/')}`);
      this.calculator.children[0].children[0].textContent = this.#result();
      this._fontСonfigurationInRes();
      this._resetTostart();
    });
  };
  brackets() {
    const bracketsBtn = document.querySelectorAll('.brackets');
    console.log(bracketsBtn)
    for (const key of bracketsBtn) {
      key.addEventListener('click', () => {
        console.log('brackets')
        if (this.calculator.children[0].children[0].textContent.endsWith('/')) return;
        if (this.calculator.children[0].children[0].textContent == '0') {
          this._countOpenBracket = 0;
          this._countCloseBracket = 0;
          console.log('brackets1')
          this._countOpenBracket = 0;
          this.calculator.children[0].children[0].textContent = '(';
          this._actionLast = true;
          ++this._countOpenBracket;
          this._counter += 1;
        } else if (this._actionLast) {
          if (this.calculator.children[0].children[0].textContent.slice(-1).endsWith(')')) {
            if (this.calculator.children[0].children[0].textContent.endsWith('.')) return;
            this.calculator.children[0].children[0].textContent += '×(';
            this._dotIs = false;
            this._actionLast = true;
            this._actionSignLast = false;
            ++this._countOpenBracket;
            this._counter += 1;
          } else {
            this.calculator.children[0].children[0].textContent += '(';
            this._actionLast = true;
            ++this._countOpenBracket;
            this._counter += 1;
          }
        } else if (this.#endNum) {
          if (this.calculator.children[0].children[0].textContent.length == 1) {
            console.log(this._countOpenBracket)
            if (!isNaN(+this.calculator.children[0].children[0].textContent.slice(-1))) {
              this._countOpenBracket = 0;
            };
          }
          if (this._countOpenBracket - 1 >= this._countCloseBracket) {
            if (this.calculator.children[0].children[0].textContent.length == 1) return;
            if (this.calculator.children[0].children[0].textContent.endsWith('.')) return;
            ++this._countCloseBracket;
            this.calculator.children[0].children[0].textContent += ')';
            this._counter += 1;
          } else {
            let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
              .replaceAll('-', '|')
              .replaceAll('×', '|')
              .replaceAll('÷', '|')
              .replaceAll('(', '|');
            if (inputVal.endsWith('|')) {
              this.calculator.children[0].children[0].textContent += '(';
              ++this._countOpenBracket;
              this._actionLast = true;
              this._counter += 1;
            } else {
              console.log(this.calculator)
              if (this.calculator.children[0].children[0].textContent.endsWith('.')) return;
              this.calculator.children[0].children[0].textContent += '×(';
              this._dotIs = false;
              ++this._countOpenBracket;
              this._actionLast = true;
              this._actionSignLast = false;
              this._counter += 1;
            }
          }
        } else {
          console.log('brackets9')
          this.calculator.children[0].children[0].textContent += '×(';
          this._dotIs = false;
          ++this._countOpenBracket;
          this._actionLast = true;
          this._actionSignLast = false;
          this._counter += 1;
        }
      })
    }
  };
}
export class HexCalculator extends Calculator {
  #result = 0;
  _hexCalc(num) {
    function convHex(arr, indx) {
      if (arr[indx] == 'A') arr[indx] = '10';
      if (arr[indx] == 'B') arr[indx] = '11';
      if (arr[indx] == 'C') arr[indx] = '12';
      if (arr[indx] == 'D') arr[indx] = '13';
      if (arr[indx] == 'E') arr[indx] = '14';
      if (arr[indx] == 'F') arr[indx] = '15';
    }
    let res = 0;
    const length = `${num}`.length;
    const strNum = num.toString();
    let k = 0;
    if (strNum.includes('/')) {
      let strTmpArr = strNum.split('/');
      res = this._hexCalc(strTmpArr[0]) / this._hexCalc(strTmpArr[1]);
      return res;
    }
    if (strNum.includes('.')) {
      let strNumArr = strNum.split('.');
      const intPartLength = strNumArr[0].length;
      const fltPartLength = strNumArr[1].length;
      let arrIntStrNum = Array.from(strNumArr[0]);
      for (let i = intPartLength - 1; i >= 0; i--) {
        convHex(arrIntStrNum, k);
        res += arrIntStrNum[k] * (16 ** i);
        k++;
      };
      k = 0;
      let arrFltStrNum = Array.from(strNumArr[1]);
      for (let i = 1; i <= fltPartLength; i++) {
        convHex(arrFltStrNum, k);
        res += arrFltStrNum[k] * (16 ** (-i));
        k++;
      };
    } else {
      let arrStrNum = Array.from(strNum);
      for (let i = length - 1; i >= 0; i--) {
        convHex(arrStrNum, k);
        res += arrStrNum[k] * (16 ** i)
        k++;
      };
    };
    return res;
  };
  showResult() {
    const equal = document.querySelector('.HexEqual');
    equal.addEventListener('click', () => {
      function checkHexNaN(arg, arr) {
        let coincidence = [];
        for (let i = 0; i < arr.length; i++) {
          if (arg == arr[i]) coincidence.push(true);
        };
        console.log(coincidence)
        if (coincidence.length) return false;
        return true;
      };
      let hexNumArr = ['A', 'B', 'C', 'D', 'E', 'F', '.', '/'];
      let actionArr = [];
      let numbersArr = [];
      let inputFieldVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|').replaceAll('×', '|').replaceAll('-', '|');
      if (inputFieldVal.includes('÷0|')) return;
      if (inputFieldVal.endsWith('÷0')) return;
      for (const key of this.calculator.children[0].children[0].textContent) {
        if (isNaN(key) && checkHexNaN(key, hexNumArr) == true) {
          actionArr.push(key);
        };
      };
      let inputFieldFilter = this.calculator.children[0].children[0].textContent.replaceAll('+', '|').replaceAll('×', '|').replaceAll('-', '|').replaceAll('÷', '|').replaceAll('(', '|').replaceAll(')', '|');
      let brknField = inputFieldFilter.replaceAll('|', '-|-');
      let brknFieldArr = brknField.split('-');

      let inputFilterArr = inputFieldFilter.split('|');
      let tmp = inputFilterArr;
      inputFilterArr = [];
      for (let key of tmp) {
        if (!(key == '')) {
          inputFilterArr.push(key);
        };
      };
      tmp = brknFieldArr;
      brknFieldArr = [];
      for (let key of tmp) {
        if (!(key == '')) {
          brknFieldArr.push(key);
        };
      };
      inputFilterArr = inputFilterArr.map(item => this._hexCalc(item));
      numbersArr = inputFilterArr;
      let inputValue = '';
      let a = 0;
      let n = 0;
      for (let i = 0; i < brknFieldArr.length; i++) {
        if (isNaN(this._hexCalc(brknFieldArr[i]))) {
          inputValue += actionArr[a];
          ++a;
        } else if (!isNaN(this._hexCalc(brknFieldArr[i]))) {
          inputValue += numbersArr[n];
          ++n;
        }
      };
      this.#result = new Function(`return ${inputValue.replaceAll('×', '*').replaceAll('÷', '/')}`);
      this.calculator.children[0].children[0].textContent = this.#result().toString(16).toUpperCase();
      this._resetTostart();
      this._fontСonfigurationInRes();
    });
  };
}
export class BinCalculator extends Calculator {
  #tmp;
  #result = 0;
  _binaryCalc(num) {
    let res = 0;
    let length = `${num}`.length;
    let strNum = num.toString();
    let k = 0;
    if (strNum.includes('.')) {
      let strNumArr = strNum.split('.');
      let intPartLength = strNumArr[0].length;
      let fltPartLength = strNumArr[1].length;
      for (let i = intPartLength - 1; i >= 0; i--) {
        res += strNumArr[0][k] * (2 ** i);
        k++;
      };
      k = 0;
      for (let i = 1; i <= fltPartLength; i++) {
        res += strNumArr[1][k] * (2 ** (-i));
        k++;
      };
    } else {
      for (let i = length - 1; i >= 0; i--) {
        res += strNum[k] * (2 ** i)
        k++;
      };
    };
    return res;
  };

  showResult() {
    const equal = document.querySelector('.binEqual');
    equal.addEventListener('click', () => {
      let actionArr = [];
      let numbersArr = [];
      let inputFieldVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|').replaceAll('×', '|').replaceAll('-', '|');
      if (inputFieldVal.includes('÷0|')) return;
      if (inputFieldVal.endsWith('÷0')) return;
      for (const key of this.calculator.children[0].children[0].textContent) {
        if (isNaN(key) && key != '.') {
          actionArr.push(key);
        };
      };
      let inputFieldFilter = this.calculator.children[0].children[0].textContent.replaceAll('+', '|').replaceAll('×', '|').replaceAll('-', '|').replaceAll('÷', '|').replaceAll('(', '|').replaceAll(')', '|');
      let brknField = inputFieldFilter.replaceAll('|', '-|-');
      let brknFieldArr = brknField.split('-');

      let inputFilterArr = inputFieldFilter.split('|');
      let tmp = inputFilterArr;
      inputFilterArr = [];
      for (let key of tmp) {
        if (!(key == '')) {
          inputFilterArr.push(key);
        };
      };
      tmp = brknFieldArr;
      brknFieldArr = [];
      for (let key of tmp) {
        if (!(key == '')) {
          brknFieldArr.push(key);
        };
      };
      inputFilterArr = inputFilterArr.map(item => +item);
      numbersArr = inputFilterArr.map(item => this._binaryCalc(item));
      let inputValue = '';
      let a = 0;
      let n = 0;
      for (let i = 0; i < brknFieldArr.length; i++) {
        if (isNaN(brknFieldArr[i])) {
          inputValue += actionArr[a];
          ++a;
        } else if (!isNaN(brknFieldArr[i])) {
          inputValue += numbersArr[n];
          ++n;
        };
      };
      this.#result = new Function(`return ${inputValue.replaceAll('×', '*').replaceAll('÷', '/')}`);
      this.calculator.children[0].children[0].textContent = this.#result().toString(2);
      this._resetTostart();
      this._fontСonfigurationInRes();
    });
  };
  toFraction() {
    const fraction = document.querySelector('.binFraction');
    fraction.addEventListener('click', () => {
      if (!this._actionSignLast) {
        if (this.calculator.children[0].children[0].textContent == '0') return;
        if (this.calculator.children[0].children[0].textContent == '1') return;
        if (this.calculator.children[0].children[0].textContent.endsWith('/')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith('(')) return;
        if (this.calculator.children[0].children[0].textContent.endsWith(')')) return;
        if (this._actionLast) return;
        let inputVal = this.calculator.children[0].children[0].textContent.replaceAll('+', '|')
          .replaceAll('-', '|')
          .replaceAll('×', '|')
          .replaceAll('÷', '|')
          .replaceAll('(', '|');
        let inputValArr = inputVal.split('|');
        let lastNum = inputValArr[inputValArr.length - 1];
        let inputFieldStart = this.calculator.children[0].children[0].textContent.slice(0, -lastNum.length);
        if (!this._lastFraction) {
          let binCurrNum = (1 / this._binaryCalc(lastNum)).toString(2).slice(0, 15);
          this.calculator.children[0].children[0].textContent = inputFieldStart + binCurrNum;
          this.#tmp = lastNum;
          this._dotIs = true;
          this._counter += binCurrNum.length;
          this._lastFraction = true;
          this._fontСonfigurationInRes();
        } else if (this._lastFraction) {
          if (!this.#tmp) return;
          this.calculator.children[0].children[0].textContent = inputFieldStart + this.#tmp;
          this._dotIs = false;
          this._counter -= 2;
          this._lastFraction = false;
          this._fontСonfigurationInRes();
        }
      }
    })
  };
}










