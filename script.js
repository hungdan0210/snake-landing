const form = document.getElementById("jobForm");
const statusDiv = document.getElementById("formStatus");

// 👉 Dán link Web App từ Google Apps Script tại đây:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  statusDiv.innerHTML = "⏳ Đang gửi dữ liệu...";

  const formData = new FormData(form);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      statusDiv.innerHTML = "✅ Gửi thành công! Tôi sẽ phản hồi sớm nhất.";
      form.reset();
    } else {
      statusDiv.innerHTML = "❌ Gửi thất bại. Vui lòng thử lại sau.";
    }
  } catch (error) {
    statusDiv.innerHTML = "❌ Lỗi kết nối. Kiểm tra mạng hoặc đường dẫn script.";
  }
});
