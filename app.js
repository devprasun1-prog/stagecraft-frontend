/* =========================
   GLOBAL STATE
========================= */
let previewStage = 0;
let stageInputs = [];

/* =========================
   ADD NO STAGE
========================= */
function addStage() {
  const input = document.createElement("input");
  input.placeholder = "NO stage text";
  input.oninput = updatePreview;
  document.getElementById("stages").appendChild(input);
  updatePreview();
}

/* =========================
   UPDATE PREVIEW (CORE)
========================= */
function updatePreview() {
  const qInput = document.getElementById("question");
  const yesInput = document.getElementById("yesText");

  const pq = document.getElementById("previewQuestion");
  const py = document.getElementById("previewYes");
  const pn = document.getElementById("previewNo");
  const info = document.getElementById("stageInfo");

  if (!pq || !py || !pn || !info) return;

  stageInputs = Array.from(
    document.querySelectorAll("#stages input")
  )
    .map(i => i.value)
    .filter(Boolean);

  pq.innerText = qInput?.value || "Your question";
  py.innerText = yesInput?.value || "Yes";
  pn.innerText = stageInputs[previewStage] || "No";

  info.innerText =
    `Stage ${previewStage + 1} of ${stageInputs.length || 1}`;
}

/* =========================
   RESET PREVIEW
========================= */
function resetPreview() {
  previewStage = 0;
  updatePreview();
}

/* =========================
   PREVIEW NO BUTTON CLICK
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("previewNo");

  if (noBtn) {
    noBtn.onclick = () => {
      if (previewStage < stageInputs.length - 1) {
        previewStage++;
        updatePreview();
      } else {
        document.getElementById("stageInfo").innerText =
          "Final stage – effect will activate for receiver";
      }
    };
  }

  updatePreview();
});

/* =========================
   GENERATE SHAREABLE LINK
========================= */
function generateLink() {
  const data = {
    question: document.getElementById("question")?.value || "",
    yes: document.getElementById("yesText")?.value || "Yes",
    stages: stageInputs,
    effect: document.getElementById("finalEffect")?.value
  };

  const encoded = btoa(
    unescape(encodeURIComponent(JSON.stringify(data)))
  );

  // ⭐ IMPORTANT: save message id for dashboard
  window.currentMessageId = encoded;

  let baseURL;
  if (location.protocol === "file:") {
    baseURL = "play.html";
  } else {
    baseURL = location.origin + "/play.html";
  }

  const link = `${baseURL}?data=${encoded}`;

  const box = document.getElementById("shareLink");
  if (box) {
    box.innerHTML = `
      <p>Share this link:</p>
      <input value="${link}" readonly onclick="this.select()" />
    `;
  }
}

/* =========================
   OPEN SENDER DASHBOARD
========================= */
document.getElementById("openStatusBtn")?.addEventListener("click", () => {
  if (!window.currentMessageId) {
    alert("Please generate the shareable link first.");
    return;
  }

  window.location.href =
    `dashboard.html?id=${window.currentMessageId}`;
});













