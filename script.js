
const scores = JSON.parse(sessionStorage.getItem("diagnosisScores")) || {};
const radarLabels = ["印象力", "共感力", "観察力", "洞察力", "提案力", "表現力", "会話力", "進展力"];
const radarKeys = ["impression", "empathy", "observation", "insight", "proposal", "expression", "communication", "progress"];
const scoreValues = radarKeys.map(k => scores[k] ?? 0);
const total = scoreValues.reduce((sum, s) => sum + s * 10, 0);

let rank = "";
if (total >= 270) rank = "Sランク（成婚力MAX）";
else if (total >= 210) rank = "Aランク（安定型）";
else if (total >= 150) rank = "Bランク（改善の余地あり）";
else if (total >= 90) rank = "Cランク（要改善）";
else rank = "Dランク（努力が必要）";

document.getElementById("totalScoreDisplay").innerText = `総合スコア：${{total}点｜ランク：${{rank}`;

new Chart(document.getElementById("radarChart"), {
  type: 'radar',
  data: {
    labels: radarLabels,
    datasets: [{
      label: "スコア",
      data: scoreValues,
      fill: true,
      backgroundColor: "rgba(0,123,255,0.2)",
      borderColor: "rgba(0,123,255,1)",
      pointBackgroundColor: "rgba(0,123,255,1)"
    }]
  },
  options: {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 3
      }
    }
  }
});

const categoryScores = radarLabels.map((label, i) => `${{label}：${{scoreValues[i]} 点`).join(" ／ ");
document.getElementById("categoryScores").innerText = categoryScores;

const comments = {
  impression: ["低", "やや低", "普通", "高"],
  empathy: ["低", "やや低", "普通", "高"],
  observation: ["低", "やや低", "普通", "高"],
  insight: ["低", "やや低", "普通", "高"],
  proposal: ["低", "やや低", "普通", "高"],
  expression: ["低", "やや低", "普通", "高"],
  communication: ["低", "やや低", "普通", "高"],
  progress: ["低", "やや低", "普通", "高"]
};

const advices = {
  impression: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  empathy: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  observation: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  insight: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  proposal: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  expression: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  communication: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"],
  progress: ["営業アドバイス1", "営業アドバイス2", "営業アドバイス3", "営業アドバイス4"]
};

const feedbackContainer = document.getElementById("feedbackContainer");
radarKeys.forEach((key, index) => {
  const score = scoreValues[index];
  const level = Math.min(Math.max(score, 0), 3);
  const fbBlock = document.createElement("div");
  fbBlock.className = "feedback-block";
  fbBlock.innerHTML = `
    <h3>${{radarLabels[index]}</h3>
    <p>${{comments[key][level]}</p>
    <p class="advice"><strong>営業脳アドバイス：</strong>${{advices[key][level]}</p>
  `;
  feedbackContainer.appendChild(fbBlock);
});
