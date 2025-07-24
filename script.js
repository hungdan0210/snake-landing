document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    service: form.service.value,
    message: form.message.value
  };

  const responseEl = document.getElementById("response");
  responseEl.textContent = "⏳ Đang gửi...";

  fetch("https://script.google.com/macros/s/AKfycbwGBHiboge-vyTCZNUJlWMZmVkGAC69YUpT7cjfJn1ZYp9nq1aZnwtxzOgKiq8Ho5Aj/exec", {
    method: "POST",
    mode: "no-cors", // vì dùng Google Script public
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    responseEl.textContent = "✅ Gửi thành công! Cảm ơn bạn đã liên hệ.";
    form.reset();
  })
  .catch(() => {
    responseEl.textContent = "❌ Có lỗi xảy ra. Vui lòng thử lại sau.";
  });
});
