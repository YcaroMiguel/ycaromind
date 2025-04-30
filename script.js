let username = "Você";
const chatOutput = document.getElementById("chat-output");

function setUsername() {
  const input = document.getElementById("username");
  username = input.value || "Você";
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  addMessage(`${username}: ${text}`, "user");
  input.value = "";

  setTimeout(() => {
    addThinkingMessage();
    setTimeout(() => {
      removeThinkingMessage();
      generateResponse(text);
    }, 1200);
  }, 300);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = text;
  chatOutput.appendChild(msg);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function addThinkingMessage() {
  const msg = document.createElement("div");
  msg.id = "thinking-msg";
  msg.className = "message bot";
  msg.textContent = "YcaroMind está pensando...";
  chatOutput.appendChild(msg);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function removeThinkingMessage() {
  const msg = document.getElementById("thinking-msg");
  if (msg) msg.remove();
}

function generateResponse(input) {
  let response = "";
  const lower = input.toLowerCase();

  // Reconhecimento de código
  if (lower.startsWith("como escrever") || lower.includes("código")) {
    response = `<pre>// Exemplo em JavaScript:
function ola() {
  console.log("Olá, mundo!");
}</pre>`;
  }

  // Respostas variadas
  else if (lower.includes("oi") || lower.includes("olá")) {
    response = `Olá, ${username}! Em que posso te ajudar?`;
  }
  else if (lower.includes("quem é você")) {
    response = "Sou o YcaroMind 2.5, seu assistente virtual moderno!";
  }
  else if (lower.includes("como você funciona")) {
    response = "Fui programado em HTML, CSS e JavaScript com lógica avançada e memória simulada.";
  }
  else {
    // Simular resposta inteligente
    response = `Interessante! Ainda estou aprendendo sobre "${input}", mas posso tentar ajudar!`;
  }

  addMessage(`YcaroMind: ${response}`, "bot");
}
