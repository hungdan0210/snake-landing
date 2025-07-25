const scriptURL = 'https://script.google.com/macros/s/AKfycbwGBHiboge-vyTCZNUJlWMZmVkGAC69YUpT7cjfJn1ZYp9nq1aZnwtxzOgKiq8Ho5Aj/exec';
const form = document.forms['submit-to-google-sheet'];
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
    .then(response => {
      responseMsg.innerHTML = "💌 Đã gửi thông tin thành công!";
      form.reset();
      setTimeout(() => {
        responseMsg.innerHTML = "";
      }, 5000);
    })
    .catch(error => {
      responseMsg.innerHTML = "❌ Gửi thất bại. Vui lòng thử lại!";
    });
});
