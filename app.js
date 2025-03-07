const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware untuk parsing form
app.use(bodyParser.urlencoded({ extended: true }));
// Menyediakan folder 'public' untuk file statis (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Array untuk menyimpan nama-nama yang masuk ruang tunggu
let waitingRoom = [];

// Halaman utama: Form input nama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menangani pengiriman form
app.post('/enter', (req, res) => {
  const name = req.body.name;
  if (name && !waitingRoom.includes(name)) {
    waitingRoom.push(name);
  }
  res.redirect('/waiting');
});

// Halaman ruang tunggu: Menampilkan daftar nama yang sudah masuk
app.get('/waiting', (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Ruang Tunggu</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
  </head>
  <body>
    <div class="container">
      <h1>Ruang Tunggu</h1>
      <p>Berikut daftar pengunjung:</p>
      <ul>`;
  waitingRoom.forEach(n => {
    html += `<li>${n}</li>`;
  });
  html += `</ul>
      <a href="/">Kembali</a>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
