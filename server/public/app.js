async function fetchCryptoData() {
    try {
        const response = await fetch('/api/crypto');
        const data = await response.json();
        updateTable(data);
        updateBestPrice(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

function updateTable(data) {
    const tableBody = document.getElementById('cryptoData');
    tableBody.innerHTML = '';

    // Sort data in descending order based on the 'last' price
    data.sort((a, b) => b.last - a.last);

    data.forEach((crypto, index) => {
        const row = document.createElement('tr');
        const difference = (((crypto) - (crypto.low)) / crypto.low * 100).toFixed(2);
        const savings = ((crypto) - crypto.low).toFixed(2);

        row.innerHTML = `
            <td class="platform">${index + 1}</td>
            <td class="platform">${crypto.name}</td>
            <td class="platform">₹ ${Number(crypto.last).toLocaleString()}</td>
            <td class="platform">₹ ${Number(crypto.low).toLocaleString()} / ₹ ${Number(crypto.high).toLocaleString()}</td>
            <td class="platform">${difference}%</td>
            <td class="platform">₹ ${savings}</td>
        `;
        tableBody.appendChild(row);
    });
}




function updateBestPrice(data) {
    const bestPrice = Math.max(...data.map(crypto => crypto.last));
    const bestCrypto = data.find(crypto => crypto.last === bestPrice);

    document.getElementById('bestPrice').textContent = `₹ ${Number(bestPrice).toLocaleString()}`;

    const change24h = ((bestPrice - bestCrypto.low) / bestCrypto.low * 100).toFixed(2);
    document.getElementById('change24h').textContent = `${change24h}%`;
}

// Fetch data every 1 minute
setInterval(fetchCryptoData, 60000);

// Initial fetch
fetchCryptoData();