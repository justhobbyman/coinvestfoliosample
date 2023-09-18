let investments = [];

function addInvestment() {
    let container = document.getElementById('investment-container');
    
    let div = document.createElement('div');
    div.className = 'investment-input';

    let sharesLabel = document.createElement('label');
    sharesLabel.innerText = 'Shares:';
    let sharesInput = document.createElement('input');
    sharesInput.type = 'number';
    sharesInput.className = 'shares-input';

    let avgBuyLabel = document.createElement('label');
    avgBuyLabel.innerText = 'Avg Buy:';
    let avgBuyInput = document.createElement('input');
    avgBuyInput.type = 'number';
    avgBuyInput.className = 'avgBuy-input';

    let removeButton = document.createElement('button');
    removeButton.innerText = '-';
    removeButton.className = 'remove-button';
    removeButton.onclick = function() {
        container.removeChild(div);
    };

    // 각 입력 칸을 감싸는 div를 생성합니다.
    let sharesDiv = document.createElement('div');
    sharesDiv.className = 'investment-field';

    let avgBuyDiv = document.createElement('div');
    avgBuyDiv.className = 'investment-field';

    sharesDiv.appendChild(sharesLabel);
    sharesDiv.appendChild(sharesInput);

    avgBuyDiv.appendChild(avgBuyLabel);
    avgBuyDiv.appendChild(avgBuyInput);

    div.appendChild(removeButton);
    div.appendChild(sharesDiv);
    div.appendChild(avgBuyDiv);
    
    container.appendChild(div);
}


function calculateDCA() {
    let initialShares = parseFloat(document.getElementById('initialShares').value) || 0;
    let initialAvgBuy = parseFloat(document.getElementById('initialAvgBuy').value) || 0;
    let initialTotalCost = initialShares * initialAvgBuy;

    let sharesInputs = document.querySelectorAll('.shares-input');
    let avgBuyInputs = document.querySelectorAll('.avgBuy-input');

    let totalShares = initialShares;
    let totalCost = initialTotalCost;

    for (let i = 0; i < sharesInputs.length; i++) {
        let shares = parseFloat(sharesInputs[i].value) || 0;
        let avgBuy = parseFloat(avgBuyInputs[i].value) || 0;
        totalShares += shares;
        totalCost += shares * avgBuy;
    }

    let avgCost = totalCost / totalShares;

    document.getElementById('resultShares').innerText = "Shares: " + totalShares;
    document.getElementById('resultAvgBuy').innerText = "Average Buy: $" + avgCost.toFixed(2);
    document.getElementById('resultTotalCost').innerText = "Total Cost: $" + totalCost.toFixed(2);
}
function resetCalculator() {
    let container = document.getElementById('investment-container');
    while (container.children.length > 1) { // 첫 번째 입력 칸만 남기고 삭제
        container.removeChild(container.lastChild);
    }
    document.getElementById('initialShares').value = '';
    document.getElementById('initialAvgBuy').value = '';
    document.getElementById('resultShares').innerText = '';
    document.getElementById('resultAvgBuy').innerText = '';
    document.getElementById('resultTotalCost').innerText = '';
}
window.onload = function() {
    addInvestment();
};
