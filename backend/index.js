// backend/index.js
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/get-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip });
});

// Self-signed certs (generate with openssl)
const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
};

https.createServer(options, app).listen(443, () => {
    console.log('HTTPS server running on port 443');
});
