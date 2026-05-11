const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const headerActions = document.querySelector(".header-actions");
const loginOpen = document.querySelector("#loginOpen");
const loginDialog = document.querySelector("#loginDialog");
const demoLogin = document.querySelector("#demoLogin");
const premiumJoin = document.querySelector("#premiumJoin");
const memberPreview = document.querySelector("#memberPreview");

function unlockPremium() {
  if (!memberPreview) return;
  memberPreview.classList.add("is-unlocked");
  memberPreview.querySelector("span").textContent = "Premium Unlocked";
  memberPreview.querySelector("h2").textContent = "AIGLOW Plusへようこそ。月額購読メンバー向けの記事表示デモです。";
  memberPreview.querySelector("p").textContent =
    "本番では、会員状態に合わせて月次レポート、限定動画、プロンプトテンプレートを表示します。";
  if (loginOpen) loginOpen.textContent = "ログイン中";
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
  headerActions.classList.toggle("is-open", !isOpen);
});

loginOpen?.addEventListener("click", () => {
  if (typeof loginDialog.showModal === "function") {
    loginDialog.showModal();
  }
});

demoLogin?.addEventListener("click", () => {
  unlockPremium();
});

premiumJoin?.addEventListener("click", () => {
  unlockPremium();
  memberPreview?.scrollIntoView({ behavior: "smooth", block: "center" });
});

const canvas = document.querySelector("#ambientCanvas");
const context = canvas?.getContext("2d");
let width = 0;
let height = 0;
let points = [];

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.max(18, Math.floor(width / 70)) }, (_, index) => ({
    x: (index / Math.max(1, Math.floor(width / 70))) * width,
    y: Math.random() * height,
    speed: 0.18 + Math.random() * 0.42,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawAmbient(time) {
  if (!context) return;
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  points.forEach((point, index) => {
    point.y -= point.speed;
    if (point.y < -40) point.y = height + 40;

    const wave = Math.sin(time * 0.001 + point.phase) * 34;
    const x = point.x + wave;
    const next = points[(index + 3) % points.length];
    const nextX = next.x + Math.sin(time * 0.001 + next.phase) * 34;

    context.strokeStyle = "rgba(88, 224, 211, 0.10)";
    context.beginPath();
    context.moveTo(x, point.y);
    context.lineTo(nextX, next.y);
    context.stroke();

    context.fillStyle = index % 4 === 0 ? "rgba(201, 246, 109, 0.38)" : "rgba(88, 224, 211, 0.34)";
    context.fillRect(x - 1, point.y - 1, 2, 2);
  });

  requestAnimationFrame(drawAmbient);
}

if (canvas && context) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(drawAmbient);
}
