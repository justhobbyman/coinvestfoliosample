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
    removeButton.onclick = function() {
        container.removeChild(div);
    };

    div.appendChild(removeButton);
    div.appendChild(sharesLabel);
    div.appendChild(sharesInput);
    div.appendChild(avgBuyLabel);
    div.appendChild(avgBuyInput);
    
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
    document.getElementById('investment-container').innerHTML = '';
    document.getElementById('initialShares').value = '';
    document.getElementById('initialAvgBuy').value = '';
    document.getElementById('resultShares').innerText = '';
    document.getElementById('resultAvgBuy').innerText = '';
    document.getElementById('resultTotalCost').innerText = '';
}
window.onload = function() {
    addInvestment();
};
