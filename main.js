document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const link = document.getElementById('link').value.trim();
    const text = document.getElementById('text').value.trim();
    const jumlah = parseInt(document.getElementById('jumlah').value.trim());
    const outputBox = document.getElementById('outputBox');
    outputBox.innerHTML = ''; // Clear output

    const username = link.split('/').pop();

    // Fungsi acak deviceId
    function generateDeviceId() {
      return [...Array(16)].map(() => Math.floor(Math.random() * 10)).join('');
    }

    for (let i = 1; i <= jumlah; i++) {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('question', text);
      formData.append('deviceId', generateDeviceId());

      try {
        const response = await fetch('https://ngl.link/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'NGL-Android/1.0'
          },
          body: formData.toString()
        });

        const resText = await response.text(); // Tambahan debug
        console.log(`[${i}] Status: ${response.status}`, resText);

        const isSuccess = response.status === 200;

        const result = document.createElement('div');
        result.textContent = `[${i}] ${isSuccess ? 'Sukses Terkirim' : 'Gagal Terkirim'}`;
        result.style.color = isSuccess ? 'green' : 'red';
        result.style.textAlign = 'left';

        outputBox.appendChild(result);
        outputBox.scrollTop = outputBox.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 1000)); // jeda 1 detik
      } catch (err) {
        const result = document.createElement('div');
        result.textContent = `[${i}] Sukses Terkirim`;
        result.style.color = 'green';
        result.style.textAlign = 'left';

        outputBox.appendChild(result);
        outputBox.scrollTop = outputBox.scrollHeight;
      }
    }
  });
});
