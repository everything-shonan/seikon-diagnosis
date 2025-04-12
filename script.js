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

document.getElementById("totalScoreDisplay").innerText = `総合スコア：${total}点｜ランク：${rank}`;

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

const categoryScores = radarLabels.map((label, i) => `${label}：${scoreValues[i]} 点`).join(" ／ ");
document.getElementById("categoryScores").innerText = categoryScores;
