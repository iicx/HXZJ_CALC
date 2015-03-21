document.addEventListener("DOMContentLoaded", function (event) {
	var i, mainWin, inputs = [], btnBox, clrBtn, okBtn, msgLabel;
	mainWin = document.getElementById('main');
	for (i = 0; i < 3; i += 1) {
		inputs.push(new ZjDataLine());
		mainWin.appendChild(inputs[i].html);
	}
	inputs[2].disable();
	clrBtn = document.createElement('button');
	clrBtn.textContent = '清空';
	clrBtn.addEventListener('click', function () {
		for (i = 0; i < 3; i += 1) {
			inputs[i].clear();
		}
		msgLabel.textContent = '版本:0.1.3 作者:百度贴吧@沧桑的菜菜';
	});
	okBtn = document.createElement('button');
	okBtn.textContent = '计算';
	okBtn.addEventListener('click', function () {
		var i, j, zj = [], zjx = [], dataOK = true, assessment, calc;
		for (i = 0; i < 3; i += 1) {
			zj.push(inputs[i].getData());
		}
		for (i = 0; i < 2; i += 1) {
			for (j = 0; j < 4; j += 1) {
				if (!zj[i][j]) {
					dataOK = false;
					break;
				}
			}
		}
		if (!zj[2][0]) {
			dataOK = false;
		}
		if (dataOK) {
			zjx[0] = zj[1][0] - zj[0][0];
			for (i = 1; i < 4; i += 1) {
				zjx[i] = Math.round((zj[1][i] - zj[0][i]) / zjx[0]);
			}
			calc = function (rank) {
				zjx[0] = rank - zj[0][0];
				for (i = 1; i < 4; i += 1) {
					zj[2][i] = Math.round(zj[0][i] + zjx[0] * zjx[i]);
				}
			};
			calc(zj[2][0]);
			inputs[2].setData(zj[2]);
			calc(70);
			assessment = Math.round(zj[2][1] / 20 + zj[2][2] + zj[2][3] / 2);
			msgLabel.innerHTML = '<span style="color:black">综合评分：' + assessment + '</span>';
		} else {
			msgLabel.innerHTML = '<span style="color:#fda4b2">请检查输入的数据</span>';
		}
	});
	btnBox = document.createElement('div');
	btnBox.className = 'zj-data-btn';
	btnBox.appendChild(clrBtn);
	btnBox.appendChild(okBtn);
	
	msgLabel = document.createElement('div');
	msgLabel.id = 'msgLabel';
	msgLabel.textContent = '版本:0.1.3 作者:百度贴吧@沧桑的菜菜';
	mainWin.appendChild(msgLabel);
	mainWin.appendChild(btnBox);
});