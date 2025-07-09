const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
  const { ip, link, text, jumlah, date } = req.body;

  const logText = `
user-spam:
ip     : ${ip}
link   : ${link}
text   : ${text}
jumlah : ${jumlah}
date   : ${date}
----------------------------`;

  fs.appendFileSync('logs.txt', logText);
  res.send('Log disimpan!');
});

app.listen(3000, () => {
  console.log('Server log berjalan di http://localhost:3000');
});