const OPENAI_API_KEY = "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"; 
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

const slider = document.getElementById('project-slider');
const dotsContainer = document.getElementById('slider-nav-dots');
const cards = document.querySelectorAll('.project-card');
let currentSlide = 0;

function createDots() {
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots(index) {
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) dot.classList.add('active');
    });
}

function moveToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
    updateDots(index);
}

setInterval(() => {
    let nextSlide = (currentSlide + 1) % cards.length;
    moveToSlide(nextSlide);
}, 5000);

createDots();

const modal = document.getElementById("contactModal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-content-details");

function openContactModal(type) {
    let title = "";
    let content = "";

    switch (type) {
        case 'email':
            title = "Contact via Email";
            content = `
                <p>Your professional email:</p>
                <a href="mailto:drayoffc@gmail.com" target="_blank">
                    <i class="fas fa-envelope"></i> drayoffc@gmail.com
                </a>
            `;
            break;

        case 'whatsapp':
            title = "Contact via WhatsApp";
            content = `
                <p>WhatsApp Number (Click to chat):</p>
               <a href="https://wa.me/6283891457614?text=hallo%20dray" target="_blank">
                    <i class="fab fa-whatsapp"></i> 6283891457614
                </a>
            `;
            break;

        case 'linkedin':
            title = "Social Media Connection";
            content = `
                <p>Let's connect on professional platform:</p>
                <a href="#" target="_blank">
                    <i class="fab fa-linkedin"></i> LinkedIn (Link not set)
                </a>
            `;
            break;

        case 'qris_info':
            title = "Alternative Payment Details";
            content = `
                <p>If QRIS does not work, use:</p>
                <a href="#"><i class="fas fa-wallet"></i> Dana: 08811582557 </a>
                <a href="#"><i class="fas fa-university"></i> Bank ABC (Coming Soon)</a>
            `;
            break;
    }

    modalTitle.textContent = title;
    modalDetails.innerHTML = content;
    modal.style.display = "block";
}

function closeContactModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeContactModal();
    }
};


const chatMessages = document.getElementById('chat-messages');
const userInput     = document.getElementById('user-input');
const sendButton    = document.getElementById('send-button');

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  userInput.value = "";
  sendButton.disabled = true;

  const typing = appendMessage("...", "ai");

  try {
  const response = await fetch("https://chateverywhere.app/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [
        {
          role: "user",
          content: text
        }
      ],
      prompt: `
Kamu adalah Zeno AI. Personality kamu ceplas-ceplos, kocak, gen-z vibes,
suka ngelawak, tapi tetap informatif.
Kalau ditanya siapa dray atau dray official,
jawab dia adalah yang memperkembangkan saya dan buat saya bahagia.
`,
      temperature: 0.6
    })
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  const data = await response.json();

  // normalisasi output (beda API, beda struktur)
  const aiText =
    data?.choices?.[0]?.message?.content ||
    data?.result ||
    data?.text ||
    "Zeno lagi bengong 😭";

  typing.remove();
  appendMessage(aiText, "ai");

} catch (err) {
  typing.textContent = `[ERROR] ${err.message}`;
}

sendButton.disabled = false;
}

function handleKeyPress(event) {
  if (event.key === "Enter") sendMessage();
}

function scrollToSection(event, id) {
  event.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


const music    = document.getElementById("bg-music");
const musicBtn = document.querySelector(".music-control");

function toggleMusic() {
  if (music.paused) {
    music.muted = false;
    music.play();
    musicBtn.textContent = "⏸ Pause";
  } else {
    music.pause();
    musicBtn.textContent = "▶ Play";
  }
}

const canvas = document.getElementById("particles");
const ctx    = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let hue = 0;

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x      = x;
    this.y      = y;
    this.size   = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color  = `hsl(${hue}, 100%, 60%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    this.color  = `hsl(${hue}, 100%, 60%)`;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 120; i++) {
    let size   = Math.random() * 3 + 1;
    let x      = Math.random() * canvas.width;
    let y      = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 1.5;
    let speedY = (Math.random() - 0.5) * 1.5;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.2)`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hue += 0.5;

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function createStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top  = Math.random() * 100 + "px";

  const size = Math.random() * 2 + 1;
  star.style.width  = size + "px";
  star.style.height = size * 40 + "px";

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 2000);
}

setInterval(() => {
  for (let i = 0; i < 3; i++) {
    setTimeout(createStar, i * 300);
  }
}, 1500);

function toggleZenoChat() {
  const chat = document.getElementById("zeno-chat-wrapper");
  const isHidden = window.getComputedStyle(chat).display === "none";
  chat.style.display = isHidden ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("zeno-chat-wrapper");
  chat.style.display = "none";
});




function playMusic(index, el) {
  // hapus active dari semua
  document.querySelectorAll(".playlist-item").forEach(item => {
    item.classList.remove("active");
  });

  // aktifkan yg diklik
  el.classList.add("active");

  // lanjutkan logic audio kamu di sini
  // audio.src = playlist[index].src
  // audio.play()
}



