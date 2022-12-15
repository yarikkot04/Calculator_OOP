export class Menu {
  #modesArr = [];
  #tmp;
  #firstMode;
  #secondMode;
  #thirdMode;
  setModes(values) {
    this.#firstMode = values[0];
    this.#secondMode = values[1];
    this.#thirdMode = values[2];
  };
  get firstMode() {
    return this.#firstMode;
  };
  get secondMode() {
    return this.#secondMode;
  };
  get thirdMode() {
    return this.#thirdMode;
  };
  buildMenu(field) {
    if (this.#modesArr.length == 0) {
      const firstField = document.createElement('div');
      const secondField = document.createElement('div');
      const thirdField = document.createElement('div');
      this.#modesArr.push(firstField, secondField, thirdField);
      firstField.className = 'Dec';
      firstField.classList.add('menuField');
      firstField.setAttribute('selected','false');
      firstField.style.backgroundColor = '#CC0000';
      secondField.className = ('Hex ');
      secondField.classList.add('menuField');
      secondField.setAttribute('selected','false');
      thirdField.classList.add('Bin');
      thirdField.classList.add('menuField');
      thirdField.setAttribute('selected','false');
      firstField.innerHTML = this.#firstMode;
      secondField.innerHTML = this.#secondMode;
      thirdField.innerHTML = this.#thirdMode;
      field.append(firstField);
      field.append(secondField);
      field.append(thirdField);
    } else {
      for (let key of Array.from(this.#modesArr)) {
        key.removeAttribute('hidden');
      };
    };
  };
  clearMenu(field) {
    let menuValues = document.querySelectorAll('.menuField');
    for (let key of Array.from(menuValues)) {
      key.setAttribute('hidden', 'true');
    };
  };
  chooseMode(val, modArr) {
    if(document.querySelector('.Dec')) document.querySelector('.Dec').style.backgroundColor = '#ff9501';
    if(this.#tmp) this.#tmp.style.backgroundColor = '#ff9501';
    for (let i = 0; i < modArr.length; i++) {
      modArr[i].setAttribute('hidden', 'true');
    }
    for (let i = 0; i < modArr.length; i++) {
      if (val.getAttribute('class').slice(0, 3) == modArr[i].id.slice(-3)) {
        modArr[i].removeAttribute('hidden');
        val.style.backgroundColor = '#CC0000';
        this.#tmp = val;
        modArr[i].children[0].children[0].style.fontSize = '3.5rem';
        modArr[i].children[0].children[0].textContent = '0';
        return i;
      };
    };
  };
};
