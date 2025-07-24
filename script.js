const API_URL = "https://overnight-api-57tf.vercel.app/api/solve";

const input = document.getElementById("inputNumber");
const resultDiv = document.getElementById("result");
const spinner = document.getElementById("spinner");

let controller = null;

function formatBigInt(n) {
  return BigInt(n).toLocaleString("en-US");
}

function getLog10Rounded(n) {
  const log = Math.log10(Number(n));
  return Math.floor(log);
}

function stopCalculation() {
  if (controller) {
    controller.abort();
    controller = null;
    spinner.style.display = "none";
    resultDiv.innerHTML = "<p><b>⛔ Đã dừng tính toán.</b></p>";
  }
}

async function findSum() {
  const x = input.value.trim();

  if (!x || isNaN(x) || BigInt(x) <= 2n || BigInt(x) % 2n !== 0n) {
    resultDiv.innerHTML =
      "<p>❌ Vui lòng nhập một số chẵn lớn hơn 2. (Ví dụ: 100, 1000000)</p>";
    return;
  }

  resultDiv.innerHTML = "";
  spinner.style.display = "block";

  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x }),
      signal,
    });

    if (!response.ok) {
      throw new Error("Lỗi từ server.");
    }

    const data = await response.json();
    spinner.style.display = "none";
    controller = null;

    if (data && data.result) {
      const a = BigInt(data.result.a);
      const b = BigInt(data.result.b);
      const sum = a + b;
      const power = getLog10Rounded(x);

      resultDiv.innerHTML = `
        ✅ Đã tìm được nghiệm:<br/>
        <b>A = ${formatBigInt(a)}</b><br/>
        <b>B = ${formatBigInt(b)}</b><br/>
        ➕ Tổng A + B = ${formatBigInt(sum)}<br/>
        👉 Con số bạn vừa thử sấp xỉ <b>10^${power}</b><br/>
        <hr/>
        <i>Giới hạn là do công nghệ/máy tính, không phải giới hạn của thuật toán OverNight.</i>
      `;
    } else {
      resultDiv.innerHTML = "<p>⚠️ Không tìm được nghiệm phù hợp.</p>";
    }
  } catch (error) {
    if (error.name === "AbortError") {
      // Đã xử lý ở stopCalculation
    } else {
      spinner.style.display = "none";
      controller = null;
      resultDiv.innerHTML = "<p>❌ Lỗi trong quá trình tính toán hoặc server không phản hồi.</p>";
    }
  }
}
