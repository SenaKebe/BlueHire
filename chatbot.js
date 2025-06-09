const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const context = `
  BlueHire is a startup founded by Sena Kebede. Our mission is to empower blue-collar workers by giving them visibility and access to job opportunities. 
  We help connect employers with skilled workers like painters, electricians, plumbers, and more. 
  Services include: worker profiles using voice (no typing needed), smart matching using AI, and monthly recognition for top-rated workers.
  Contact us through the form or chatbot. Vision: a world where skilled labor earns dignity, opportunity, and stable income.
`;

function appendMessage(message, sender) {
  const msg = document.createElement("div");
  msg.className = `chat-bubble ${sender}`;
  msg.innerText = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) {
    appendMessage("Please enter a question.", "error");
    return;
  }

  appendMessage(input, "user");
  userInput.value = "";

  try {
    const res = await puter.ai.chat({
      messages: [
        { role: "system", content: context },
        { role: "user", content: input },
      ],
    });
    appendMessage(res.choices[0].message.content, "bot");
  } catch (error) {
    appendMessage("Something went wrong. Try again later.", "error");
    console.error(error);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
