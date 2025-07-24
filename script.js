
document.getElementById("requestForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Trong bản demo này chỉ hiển thị thông báo, chưa kết nối backend
  document.getElementById("thanksMsg").style.display = "block";
  this.reset();
});
