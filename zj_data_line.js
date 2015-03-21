function ZjDataLine(disabled) {
	var i, textInput, placeholders, numLen = [2, 5, 4, 4];
    this.disabled = disabled || false;
	this.html = document.createElement('div');
	this.html.className = 'zj-data-line';
	this.inputs = [];
	for (i = 0; i < 4; i += 1) {
		textInput = document.createElement('input');
		textInput.setAttribute('type', 'text');
		textInput.setAttribute('name', 'data' + i);
		textInput.addEventListener('keydown', this.validateNum(numLen[i]));
		this.inputs.push(textInput);
		this.html.appendChild(this.inputs[i]);
	}
}

ZjDataLine.prototype.clear = function () {
	var i;
    for (i = 0; i < 4; i += 1) {
		this.inputs[i].value = '';
	}
};

ZjDataLine.prototype.disable = function () {
	var i;
	for (i = 1; i < 4; i += 1) {
		this.inputs[i].setAttribute('disabled', 'true');
	}
};

ZjDataLine.prototype.getData = function () {
	var i, out = [];
	for (i = 0; i < 4; i += 1) {
		out.push(parseInt(this.inputs[i].value, 10));
	}
	return out;
};

ZjDataLine.prototype.setData = function (data) {
	var i;
	for (i = 1; i < 4; i += 1) {
		this.inputs[i].value = data[i].toString();
	}
};

ZjDataLine.prototype.validateNum = function (numLen) {
	var isNum, isFunc;
	return function (e) {
		isNum = function () {
			if ((e.keyCode >= 48 && e.keyCode <= 57) ||
			        (e.keyCode >= 96 && e.keyCode <= 105)) {
				return true;
			} else {
				return false;
			}
		};
		isFunc = function () {
			if ((e.keyCode >= 37 && e.keyCode <= 40) ||
			         e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 9) {
				return true;
			} else {
				return false;
			}
		};
		if (!(isNum() || isFunc())) {
			e.preventDefault();
		} else {
			if (e.target.value.length >= numLen && isNum()) {
				e.preventDefault();
			}
		}
	};
};