let investments = [];

        function addInvestment() {
            let shares = parseFloat(document.getElementById('shares').value);
            let avgBuy = parseFloat(document.getElementById('avgBuy').value);
            let totalCost = shares * avgBuy;

            investments.push({ shares, avgBuy, totalCost });

            // 입력 필드 초기화
            document.getElementById('shares').value = '';
            document.getElementById('avgBuy').value = '';

            displayInvestments();
        }

        function removeInvestment(index) {
            investments.splice(index, 1);
            displayInvestments();
        }

        function displayInvestments() {
            let container = document.getElementById('investments');
            container.innerHTML = '';

            investments.forEach((investment, index) => {
                container.innerHTML += `
                    <div>
                        <button onclick="removeInvestment(${index})">-</button>
                        Shares (${index + 1}): ${investment.shares}
                        Avg Buy (${index + 1}): ${investment.avgBuy}
                        Total Cost (${index + 1}): ${investment.totalCost}
                    </div>
                `;
            });
        }

        function calculateDCA() {
            let initialShares = parseFloat(document.getElementById('initialShares').value);
            let initialAvgBuy = parseFloat(document.getElementById('initialAvgBuy').value);
            let initialTotalCost = initialShares * initialAvgBuy;

            let totalShares = investments.reduce((acc, curr) => acc + curr.shares, initialShares);
            let totalCost = investments.reduce((acc, curr) => acc + curr.totalCost, initialTotalCost);
            let avgCost = totalCost / totalShares;

            document.getElementById('resultShares').innerText = "Shares: " + totalShares;
            document.getElementById('resultAvgBuy').innerText = "Average Buy: $" + avgCost.toFixed(2);
            document.getElementById('resultTotalCost').innerText = "Total Cost: $" + totalCost.toFixed(2);
        }

        function resetCalculator() {
            investments = [];
            displayInvestments();
            document.getElementById('initialShares').value = '';
            document.getElementById('initialAvgBuy').value = '';
            document.getElementById('resultShares').innerText = '';
            document.getElementById('resultAvgBuy').innerText = '';
            document.getElementById('resultTotalCost').innerText = '';
        }
