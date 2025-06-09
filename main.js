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

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-button");
  const testimonialCardsContainer = document.getElementById("testimonialCards");

  const testimonials = {
    employee: [
      {
        img: "./assets/images/painter.png",
        text: "This platform helped me find reliable work consistently!",
        name: "Amanuel Bekele, Electrician",
      },
      {
        img: "./assets/images/painter.png",
        text: "BlueHire connected me with jobs I truly enjoy.",
        name: "Selam Tadesse, Painter",
      },
    ],
    recruiter: [
      {
        img: "./assets/images/recruiter.png",
        text: "I hired a plumber in minutes. Highly recommended!",
        name: "Meron Desta, Homeowner",
      },
      {
        img: "./assets/images/recruiter.png",
        text: "It’s fast, efficient, and trustworthy.",
        name: "Nahom Elias, Apartment Manager",
      },
    ],
  };

  function renderTestimonials(type) {
    testimonialCardsContainer.classList.add("fade-out");

    setTimeout(() => {
      testimonialCardsContainer.innerHTML = testimonials[type]
        .map(
          (testimonial) => `
            <div class="testimonial-card">
              <img src="${testimonial.img}" alt="${testimonial.name}" />
              <div>
                <p>${testimonial.text}</p>
                <p><strong>- ${testimonial.name}</strong></p>
              </div>
            </div>
          `
        )
        .join("");

      testimonialCardsContainer.classList.remove("fade-out");
    }, 200);
  }

  renderTestimonials("employee");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const audienceType = button.getAttribute("data-audience");
      renderTestimonials(audienceType);
    });
  });
});

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

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");

      const column = item.closest(".faq-column");
      if (column) {
        const columnItems = column.querySelectorAll(".faq-item");
        columnItems.forEach((colItem) => {
          if (colItem !== item && colItem.classList.contains("active")) {
            colItem.classList.remove("active");
          }
        });
      }
    });
  });
});
