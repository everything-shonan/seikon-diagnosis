
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

document.getElementById("categoryScores").innerText = radarLabels.map((label, i) => `${label}：${scoreValues[i]} 点`).join(" ／ ");

const comments = {
  impression: ["★0印象力コメント", "★1印象力コメント", "★2印象力コメント", "★3印象力コメント"],
  empathy: ["★0共感力コメント", "★1共感力コメント", "★2共感力コメント", "★3共感力コメント"],
  observation: ["★0観察力コメント", "★1観察力コメント", "★2観察力コメント", "★3観察力コメント"],
  insight: ["★0洞察力コメント", "★1洞察力コメント", "★2洞察力コメント", "★3洞察力コメント"],
  proposal: ["★0提案力コメント", "★1提案力コメント", "★2提案力コメント", "★3提案力コメント"],
  expression: ["★0表現力コメント", "★1表現力コメント", "★2表現力コメント", "★3表現力コメント"],
  communication: ["★0会話力コメント", "★1会話力コメント", "★2会話力コメント", "★3会話力コメント"],
  progress: ["★0進展力コメント", "★1進展力コメント", "★2進展力コメント", "★3進展力コメント"]
};

const advices = {
  impression: ["★0印象力アドバイス", "★1印象力アドバイス", "★2印象力アドバイス", "★3印象力アドバイス"],
  empathy: ["★0共感力アドバイス", "★1共感力アドバイス", "★2共感力アドバイス", "★3共感力アドバイス"],
  observation: ["★0観察力アドバイス", "★1観察力アドバイス", "★2観察力アドバイス", "★3観察力アドバイス"],
  insight: ["★0洞察力アドバイス", "★1洞察力アドバイス", "★2洞察力アドバイス", "★3洞察力アドバイス"],
  proposal: ["★0提案力アドバイス", "★1提案力アドバイス", "★2提案力アドバイス", "★3提案力アドバイス"],
  expression: ["★0表現力アドバイス", "★1表現力アドバイス", "★2表現力アドバイス", "★3表現力アドバイス"],
  communication: ["★0会話力アドバイス", "★1会話力アドバイス", "★2会話力アドバイス", "★3会話力アドバイス"],
  progress: ["★0進展力アドバイス", "★1進展力アドバイス", "★2進展力アドバイス", "★3進展力アドバイス"]
};

const feedbackContainer = document.getElementById("feedbackContainer");
radarKeys.forEach((key, index) => {
  const score = scoreValues[index];
  const level = Math.min(Math.max(score, 0), 3);
  const fbBlock = document.createElement("div");
  fbBlock.className = "feedback-block";
  fbBlock.innerHTML = `
    <h3>${radarLabels[index]}</h3>
    <p>${comments[key][level]}</p>
    <p class="advice"><strong>営業脳からのアドバイス：</strong>${advices[key][level]}</p>
  `;
  feedbackContainer.appendChild(fbBlock);
});
