var tbody = document.querySelector('#table tbody');
var dataSet = [];

document.querySelector('#exec').addEventListener('click', function() {
    tbody.innerHTML = '';
    console.log("dataSet: " + dataSet)
    dataSet = [];
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    var candidates = Array(hor * ver)
        .fill(undefined)
        .map((item, index) => {
        return index;
    });

    var shuffle = [];
    while (candidates.length > hor * ver - mine) {
        var picked = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
        shuffle.push(picked);
    }

    for (var i = 0; i < ver; i++) {
        var arr = [];
        dataSet.push(arr);
        var tr = document.createElement('tr');
        for (var j = 0; j < hor; j++) {
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                // target은 이벤트(contextmenu)가 발생한 태그를 의미한다.
                // currentTarget은 eventListener가 달린 태그를 의미한다.
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var rowIdx = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                var colIdx = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);

                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';

                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';

                } else if (e.currentTarget.textContent === '?') {
                    if (dataSet[rowIdx][colIdx] === 1) {
                        e.currentTarget.textContent = '';
                    } else if (dataSet[rowIdx][colIdx] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }
                }

            });
            td.addEventListener('click', function (e) {
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var rowIdx = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                var colIdx = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);

                if (dataSet[rowIdx,colIdx] === 'X') {
                    e.currentTarget.textContent = '펑';
                } else {
                    var aroundMine = [
                        dataSet[rowIdx][colIdx - 1], dataSet[rowIdx][colIdx + 1],
                    ].filter(function (v) {
                        return v === 'X'
                    });
                    if (dataSet[rowIdx - 1]) {
                        aroundMine = aroundMine.concat(dataSet[rowIdx - 1][colIdx - 1], dataSet[rowIdx - 1][colIdx], dataSet[rowIdx - 1][colIdx + 1]);
                    }
                    if (dataSet[rowIdx + 1]) {
                        aroundMine = aroundMine.concat(dataSet[rowIdx + 1][colIdx - 1], dataSet[rowIdx + 1][colIdx], dataSet[rowIdx + 1][colIdx + 1]);
                    }

                    e.currentTarget.textContent = aroundMine.length;
                }
            })
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    for (var k = 0; k < shuffle.length; k++) {
        var row = Math.floor(shuffle[k] / 10);
        var col = shuffle[k] % 10;
        console.log(row, col);
        tbody.children[row].children[col].textContent = 'X';
        dataSet[row][col] = 'X';
    }
});
