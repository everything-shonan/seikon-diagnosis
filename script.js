
// script.js

// 診断スコアをセッションストレージから取得
const scores = JSON.parse(sessionStorage.getItem("diagnosisScores")) || {};
const radarKeys = [
  "impression",
  "empathy",
  "observation",
  "insight",
  "proposal",
  "expression",
  "communication",
  "progress"
];
const radarLabels = [
  "印象力",
  "共感力",
  "観察力",
  "洞察力",
  "提案力",
  "表現力",
  "会話力",
  "進展力"
];

// 各スコアを抽出して合計点とランクを算出
const scoreValues = radarKeys.map(k => scores[k] ?? 0);
const total = scoreValues.reduce((sum, s) => sum + s * 10, 0);

let rank = "";
if (total >= 270) rank = "Sランク（成婚力MAX）";
else if (total >= 210) rank = "Aランク（安定型）";
else if (total >= 150) rank = "Bランク（改善の余地あり）";
else if (total >= 90) rank = "Cランク（要改善）";
else rank = "Dランク（努力が必要）";

document.getElementById("totalScoreDisplay").innerText = `総合スコア：${total}点（${rank}）`;

document.getElementById("categoryScores").innerText = radarLabels
  .map((label, i) => `${label}：${scoreValues[i]}点`)
  .join(" / ");

// レーダーチャート描画
new Chart(document.getElementById("radarChart"), {
  type: 'radar',
  data: {
    labels: radarLabels,
    datasets: [{
      label: "あなたのスコア",
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

// 診断コメント（仮）と営業脳アドバイス（仮）表示
const comments = {
  impression: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  empathy: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  observation: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  insight: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  proposal: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  expression: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  communication: ["改善が必要", "やや不安定", "平均的", "非常に良い"],
  progress: ["改善が必要", "やや不安定", "平均的", "非常に良い"]
};

const advices = {
  impression: ["第一印象を磨くトレーニングをしましょう。", "笑顔と姿勢を意識してみてください。", "印象の安定感が増しています。", "完璧です！自信を持って行きましょう。"],
  empathy: ["共感の姿勢が不足しています。", "相手に寄り添う表現を増やしましょう。", "共感が安定しています。", "素晴らしい共感力です。"],
  observation: ["観察力を磨きましょう。", "相手の表情や言葉に注目してみて。", "平均的な観察力です。", "細かな変化にも気づける力あり！"],
  insight: ["本音に迫る質問ができていないかも。", "沈黙や間を意識しましょう。", "一定の洞察力があります。", "非常に深く相手を理解できています。"],
  proposal: ["提案が一方的になっていませんか？", "相手の反応を見て提案を変えてみましょう。", "提案力は良好です。", "とても魅力的な提案ができています。"],
  expression: ["自分の魅力をもっと伝えましょう。", "誠実な表現を意識して。", "伝え方は安定しています。", "あなたらしい魅力が伝わっています。"],
  communication: ["質問や傾聴に工夫が必要かも。", "相手が話しやすい雰囲気を大切に。", "会話のバランスは良好です。", "聞き上手・話し上手の両方を持っています。"],
  progress: ["タイミングを逃しているかも。", "次のステップの提案を意識しましょう。", "関係構築の進展に安定感があります。", "理想的な進展ペースです。"]
};

const feedbackContainer = document.getElementById("feedbackContainer");
radarKeys.forEach((key, index) => {
  const level = Math.min(Math.max(scoreValues[index], 0), 3);
  const block = document.createElement("div");
  block.className = "feedback-block";
  block.innerHTML = `
    <h3>${radarLabels[index]}</h3>
    <p>${comments[key][level]}</p>
    <p class="advice"><strong>営業脳からのアドバイス：</strong>${advices[key][level]}</p>
  `;
  feedbackContainer.appendChild(block);
});
