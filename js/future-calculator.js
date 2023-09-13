function calculateLeverageProfitLoss() {
            const positionType = document.getElementById('positionType').value;
            const leverage = parseFloat(document.getElementById('leverageAmount').value);
            const investment = parseFloat(document.getElementById('investmentLeverage').value);
            const entryPrice = parseFloat(document.getElementById('entryPrice').value);
            const exitPrice = parseFloat(document.getElementById('exitPrice').value);
        
            let profitLossDollar;
            if (positionType === "long") {
                profitLossDollar = (exitPrice - entryPrice) * investment;
            } else { // short
                profitLossDollar = (entryPrice - exitPrice) * investment;
            }
        
            const IMR = 1 / leverage;
            const initialMargin = investment * entryPrice * IMR;
            const profitLossPercent = (profitLossDollar / initialMargin) * 100;
        
            const resultElementDollar = document.getElementById('leverageResultDollar');
            const resultElementPercent = document.getElementById('leverageResultPercent');
        
            resultElementDollar.innerText = `Profit/Loss ($): $${profitLossDollar.toFixed(2)}`;
            resultElementPercent.innerText = `ROE (%): ${profitLossPercent.toFixed(2)}%`;
           
            if (profitLossDollar < 0) {
            resultElementDollar.style.color = 'blue';
            resultElementPercent.style.color = 'blue';
            } else if (profitLossDollar > 0) {
                resultElementDollar.style.color = 'red';
                resultElementPercent.style.color = 'red';
            } else {
                resultElementDollar.style.color = '#FFFFFF';
                resultElementPercent.style.color = '#FFFFFF';
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
            const futureResultDollar = document.getElementById('leverageResultDollar').innerText;
            const futureResultPercent = document.getElementById('leverageResultPercent').innerText;
            
            let shareText = futureResultDollar + '\n' + futureResultPercent;
            
            
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



