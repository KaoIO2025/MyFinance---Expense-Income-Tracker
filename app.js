// 🌙 ดาร์กโหมด
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
});
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

// 🟢 เปลี่ยนหน้า
function showPage(pageId) {
  document.querySelectorAll("main").forEach(m => m.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// ✅ ข้อมูลรายการ
let records = JSON.parse(localStorage.getItem("records")) || [];
updateBalance();

// ➕ บันทึกข้อมูล
document.getElementById("recordForm").addEventListener("submit", e => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let amount = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value;
  records.push({ title, amount, type });
  localStorage.setItem("records", JSON.stringify(records));
  e.target.reset();
  updateBalance();
  showPage('dashboard');
});

// 🔥 อัปเดตยอดรวม + กราฟ
function updateBalance() {
  let income = records.filter(r => r.type === "income").reduce((t, r) => t + r.amount, 0);
  let expense = records.filter(r => r.type === "expense").reduce((t, r) => t + r.amount, 0);
  document.getElementById("balance").textContent = `฿${income - expense}`;
  updateChart(income, expense);
}

// 🔵 กราฟ
let chartCtx = document.getElementById("chart").getContext("2d");
let chart = new Chart(chartCtx, {
  type: 'doughnut',
  data: {
    labels: ['รายรับ', 'รายจ่าย'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4CAF50', '#F44336']
    }]
  }
});
function updateChart(income, expense) {
  chart.data.datasets[0].data = [income, expense];
  chart.update();
}
