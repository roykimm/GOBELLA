const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 7000;

app.get('/',(req,res) => {
    res.send('hello 223my gobella world');
});

app.listen(PORT, () => {
    console.log(`서버가 시작되었습니다. (${PORT} 포트)`)
});

