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

 function updateInputValue(inputId, value) {
            const inputElement = document.getElementById(inputId);
            if (value === "custom") {
                inputElement.style.display = "block";
            } else {
                inputElement.style.display = "none";
                inputElement.value = value;
            }
        }

function sharePNL() {
            const spotResultPNL = document.getElementById('resultPNL').innerText;
            const spotResultROE = document.getElementById('resultROE').innerText;
            
            let shareText = spotResultPNL + '\n' + spotResultROE;
            
            // 현재 페이지의 URL 추가
            shareText += '\n\n' + window.location.href;
        
            copyToClipboard(shareText);
            alert('Your result and website link have been copied to the clipboard. Paste it wherever you like!');
        }

function copyToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        
            document.body.removeChild(textArea);
        }

window.onload = function() {
            const urlParams = new URLSearchParams(window.location.search);
            const sharedResult = urlParams.get('result');
            if (sharedResult) {
                document.getElementById('result').innerText = sharedResult;

                const profitLossValue = parseFloat(sharedResult.split('$')[1]);
                const resultElement = document.getElementById('result');
        
                if (profitLossValue < 0) {
                    resultElement.style.color = 'blue';
                } else if (profitLossValue > 0) {
                    resultElement.style.color = 'red';
                } else {
                    resultElement.style.color = '#FFFFFF';
                }
            }  
        }
