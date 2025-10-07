const express = require('express');
const app = express();
const port = 3000;

app.get('/api/roi', (req, res) => {
    res.send('Roi calculator');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
