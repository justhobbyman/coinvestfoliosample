function calculateProfitLoss() {
            const buyPrice = parseFloat(document.getElementById('buyPrice').value);
            const sellPrice = parseFloat(document.getElementById('sellPrice').value);
            const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
        
            let buyingFee = parseFloat(document.getElementById('buyingFee').value);
            if (isNaN(buyingFee)) {
                buyingFee = parseFloat(document.getElementById('buyingFeeSelect').value);
            }
        
            let sellingFee = parseFloat(document.getElementById('sellingFee').value);
            if (isNaN(sellingFee)) {
                sellingFee = parseFloat(document.getElementById('sellingFeeSelect').value);
            }
        
            buyingFee = buyingFee / 100;
            sellingFee = sellingFee / 100;
        
            const totalBuyingFee = investmentAmount * buyingFee;
            const profitLoss = (investmentAmount / buyPrice) * (sellPrice - buyPrice) - totalBuyingFee - (investmentAmount / buyPrice) * sellPrice * sellingFee;
        
            const ROE = (profitLoss / investmentAmount) * 100;
        
            const resultPNLElement = document.getElementById('resultPNL');
            const resultROEElement = document.getElementById('resultROE');
        
            resultPNLElement.innerText = `Profit/Loss ($): $${profitLoss.toFixed(2)}`;
            resultROEElement.innerText = `ROE (%): ${ROE.toFixed(2)}%`;
        
            if (profitLoss < 0) {
                resultPNLElement.style.color = 'blue';
                resultROEElement.style.color = 'blue';
            } else if (profitLoss > 0) {
                resultPNLElement.style.color = 'red';
                resultROEElement.style.color = 'red';
            } else {
                resultPNLElement.style.color = '#FFFFFF';
                resultROEElement.style.color = '#FFFFFF';
            }
        }

