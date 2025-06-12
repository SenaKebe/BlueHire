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

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const chatStatus = document.getElementById("chat-status");

  let isInitialized = false;
  const conversationHistory = [];

  function updateStatus(message) {
    chatStatus.textContent = message;
  }

  function enableChat() {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }

  function disableChat() {
    userInput.disabled = true;
    sendBtn.disabled = true;
  }

  async function testConnection() {
    try {
      const testResponse = await window.puter.ai.chat("Hello", {
        model: "gpt-4o-mini",
      });
      console.log("Puter.js AI connection successful");
      return true;
    } catch (error) {
      console.error("Puter.js connection test failed:", error);
      throw new Error(
        "Unable to connect to AI services. Please refresh the page and try again."
      );
    }
  }

  async function initChatbot() {
    try {
      updateStatus("Connecting to AI services...");
      await testConnection();
      isInitialized = true;
      enableChat();
      updateStatus("Ready to chat!");
    } catch (error) {
      console.error("Failed to initialize chatbot:", error);
      updateStatus("Failed to initialize. Please refresh the page.");
    }
  }

  function addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message";
    typingDiv.id = "typing-indicator";

    const typingContent = document.createElement("div");
    typingContent.className = "typing-indicator";

    const typingDots = document.createElement("div");
    typingDots.className = "typing-dots";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.className = "typing-dot";
      typingDots.appendChild(dot);
    }

    typingContent.appendChild(typingDots);
    typingDiv.appendChild(typingContent);
    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  async function getAIResponse(userMessage) {
    try {
      const prompt = `You are BlueHire's AI assistant. BlueHire is an innovative startup focused on revolutionizing the hiring and recruitment industry.

ABOUT BLUEHIRE:
- We specialize in AI-powered hiring solutions
- Our mission is to make hiring more efficient, fair, and data-driven
- We offer candidate screening, interview scheduling, skills assessment, and recruitment analytics
- Founded by HR professionals and tech experts
- We're committed to reducing hiring bias through technology

Please answer the following question about BlueHire in a helpful, professional yet friendly manner:

${userMessage}`;

      const response = await window.puter.ai.chat(prompt, {
        model: "gpt-4o-mini",
      });

      return response;
    } catch (error) {
      console.error("AI API Error Details:", error);

      if (error.message?.includes("rate limit")) {
        throw new Error(
          "I'm getting too many requests right now. Please wait a moment and try again."
        );
      } else if (error.message?.includes("network")) {
        throw new Error(
          "I'm having network connectivity issues. Please check your internet connection."
        );
      } else if (error.message?.includes("unauthorized")) {
        throw new Error(
          "Authentication issue with AI services. Please refresh the page."
        );
      } else {
        throw new Error(
          "I'm temporarily unavailable. Please try asking your question again."
        );
      }
    }
  }

  async function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message || !isInitialized) return;

    addMessage(message, "user");
    userInput.value = "";

    disableChat();
    updateStatus("BlueHire is thinking...");

    const typingIndicator = showTypingIndicator();

    try {
      const response = await getAIResponse(message);
      removeTypingIndicator(typingIndicator);
      addMessage(response, "bot");
    } catch (error) {
      console.error("Error getting AI response:", error);
      removeTypingIndicator(typingIndicator);
      addMessage(
        error.message || "Sorry, I encountered an error. Please try again.",
        "bot"
      );
    } finally {
      enableChat();
      updateStatus("Ready to chat!");
    }
  }

  sendBtn.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
  });

  initChatbot();
});

window.addEventListener("load", () => {
  console.log("BlueHire Chatbot initialized with Puter.js");
});
