function toggleMenu() {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("active");
}
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".keyFeatures-card");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 32;
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
let visitCount = localStorage.getItem("visitCount");

if (visitCount) {
  visitCount = parseInt(visitCount) + 1;
} else {
  visitCount = 1;
}

localStorage.setItem("visitCount", visitCount);

document.getElementById("visit-count").textContent = visitCount;

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const contextPrompt = `
You are BlueHire’s helpful AI assistant.
BlueHire is a startup founded by Sena Kebede. Our mission is to empower blue-collar workers by giving them visibility and access to job opportunities.
We help connect employers with skilled workers like painters, electricians, plumbers, and more.
Services include: worker profiles using voice (no typing needed), smart matching using AI, and monthly recognition for top-rated workers.
Vision: a world where skilled labor earns dignity, opportunity, and stable income.
Contact us through the form or chatbot.

Be friendly, clear, and helpful in your answers. Respond to greetings like "hello", and explain who you are if someone asks "what is BlueHire?" or "who are you?".
`;

function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.className = "chat " + sender;
  div.innerHTML =
    sender === "ai"
      ? `<span class="flag">⛑️</span><strong>AI:</strong> ${message}`
      : `<strong>👤 You:</strong> ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const msg = userInput.value.trim();
  if (!msg) {
    alert("Please enter a message.");
    return;
  }

  appendMessage("user", msg);
  userInput.value = "";

  try {
    const fullPrompt = `${contextPrompt}\n\nUser: ${msg}\nAI:`;

    const response = await puter.ai.chat({
      prompt: fullPrompt,
    });

    if (response && response.choices && response.choices.length > 0) {
      const aiReply =
        response.choices[0].text ||
        response.choices[0].message?.content ||
        "No response.";
      appendMessage("ai", aiReply.trim());
    } else {
      appendMessage("ai", "No response from the AI.");
      console.warn(response);
    }
  } catch (err) {
    appendMessage("ai", "Error reaching the AI. Please try again later.");
    console.error(err);
  }
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
