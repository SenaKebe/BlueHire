const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".keyFeatures-card");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 32; // include the 2rem (gap)
  const offset = (track.offsetWidth - cardWidth) / 2;
  track.style.transform = `translateX(calc(${offset}px - ${
    cardWidth * currentIndex
  }px))`;

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === currentIndex);
  });
}

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

rightArrow.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Touch support
let startX = 0;
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const delta = endX - startX;

  if (delta > 50 && currentIndex > 0) {
    currentIndex--;
  } else if (delta < -50 && currentIndex < cards.length - 1) {
    currentIndex++;
  }

  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input"); // ✅ corrected ID
  const chatBox = document.getElementById("chat-box");

  if (!sendBtn || !userInput || !chatBox) return;

  const faq = {
    "do i need a diploma to get hired here":
      "No diploma needed! BlueHire connects you based on skills, not certificates.",
    "how do i apply":
      "You can apply by creating a profile and showcasing your skills.",
    "what is bluehire":
      "BlueHire is a platform that connects employers with skilled individuals.",
    "is bluehire free": "Yes, BlueHire is free for job seekers.",
  };

  sendBtn.addEventListener("click", () => {
    const msg = userInput.value.trim();
    if (!msg) return;

    appendUserMessage(msg);
    const response = getBotResponse(msg);
    setTimeout(() => {
      appendBotMessage(response);
    }, 500);

    userInput.value = "";
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  function appendUserMessage(text) {
    const div = document.createElement("div");
    div.className = "user-message";
    div.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function appendBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot-message";
    div.innerHTML = `
      <img src="./assets/images/BlueHireLogo.png" alt="bot" />
      <p>${text}</p>
    `;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getBotResponse(msg) {
    const lowerMsg = msg.toLowerCase();
    for (const question in faq) {
      if (lowerMsg.includes(question)) {
        return faq[question];
      }
    }
    return "Sorry, I don't have an answer to that yet.";
  }
});
