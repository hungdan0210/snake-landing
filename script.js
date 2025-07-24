document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn reload trang

    // Thu thập thông tin
    const name = form.querySelector('input[name="name"]').value;
    const service = form.querySelector('select[name="service"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // Hiển thị thông báo (popup)
    alert(`Cảm ơn bạn, ${name}!\nDịch vụ yêu cầu: ${service}\nChúng tôi sẽ sớm liên hệ lại.`);

    // Reset form
    form.reset();
  });
});
