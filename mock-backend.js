// Super Simple Mock Backend for Testing
const http = require('http');

const mockPaymentData = {
    success: true,
    accessCode: "TEST123",
    walletAddress: "9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK",
    ergAmount: 23.5176,
    ergPriceUsd: 0.85,
    ergoPayUrl: "ergopay://example.com"
};

const server = http.createServer((req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/api/payment/ergo/initiate' && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockPaymentData));
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(8080, () => {
    console.log('✅ Mock backend running on http://localhost:8080');
    console.log('📝 Returns fake ERG payment data for testing');
    console.log('Press Ctrl+C to stop');
});
