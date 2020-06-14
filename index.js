const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 7000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"client/build","index.html"));
});

app.listen(PORT, () => {
    console.log(`${PORT} 포트에서 서버가 시작되었습니다.`)
});

