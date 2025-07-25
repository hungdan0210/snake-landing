const scriptURL = 'https://script.google.com/macros/s/AKfycbwGBHiboge-vyTCZNUJlWMZmVkGAC69YUpT7cjfJn1ZYp9nq1aZnwtxzOgKiq8Ho5Aj/exec';

const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusDiv.textContent = '⏳ Đang gửi...';

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
    .then(response => {
      if (response.ok) {
        statusDiv.textContent = '✅ Gửi thành công! Cảm ơn bạn.';
        form.reset();
      } else {
        throw new Error('Lỗi phản hồi server.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      statusDiv.textContent = '❌ Gửi thất bại. Vui lòng thử lại.';
    });
});
