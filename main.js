document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const link = document.getElementById('link').value.trim();
  const text = document.getElementById('text').value.trim();
  const jumlah = parseInt(document.getElementById('jumlah').value.trim());
  const outputBox = document.getElementById('outputBox');

  outputBox.innerHTML = '';

  const username = link.split('/').pop();
  let userIP = 'Unknown';

  // Ambil IP publik (via API gratis)
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    userIP = data.ip;
  } catch (err) {
    userIP = 'Error getting IP';
  }

  // Fungsi ngirim ke NGL
  const sendNGL = async (targetUsername, message) => {
    const formData = new URLSearchParams();
    formData.append('username', targetUsername);
    formData.append('question', message);
    formData.append('deviceId', '0000000000000000');

    const response = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'NGL-Android/1.0'
      },
      body: formData.toString()
    });

    return response.status === 200;
  };

  // Mulai spam ke target
  for (let i = 1; i <= jumlah; i++) {
    const success = await sendNGL(username, text);

    const result = document.createElement('div');
    result.textContent = `[${i}] ${success ? 'Sukses Terkirim' : 'Gagal Terkirim'}`;
    result.style.color = success ? 'green' : 'red';
    result.style.textAlign = 'left';

    outputBox.appendChild(result);
    outputBox.scrollTop = outputBox.scrollHeight;

    await new Promise(resolve => setTimeout(resolve, 500)); // delay 0.5s
  }

  // Setelah spam selesai, kirim log ke NGL kamu
  const now = new Date();
  const dateTime = now.toLocaleString('id-ID');

  const logText = `[SPAM REPORT]
IP: ${userIP}
Target: ${link}
Pesan: ${text}
Jumlah: ${jumlah}
Waktu: ${dateTime}`;

  await sendNGL('dyyz40885', logText);
});
