let memory = [];

function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value.trim();

  if (userMessage !== "") {
    addMessage("Você: " + userMessage, "user");
    inputField.value = "";
    generateResponse(userMessage);
  }
}

function addMessage(message, sender) {
  const chatOutput = document.getElementById("chat-output");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  chatOutput.appendChild(messageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to bottom
}

function generateResponse(userMessage) {
  // Salvar a mensagem do usuário na memória
  memory.push(userMessage);

  let response = "Desculpe, não entendi isso.";

  if (userMessage.toLowerCase().includes("olá") || userMessage.toLowerCase().includes("oi")) {
    response = "Olá! Como posso ajudar você hoje?";
  } else if (userMessage.toLowerCase().includes("como você está")) {
    response = "Eu estou funcionando bem, obrigado por perguntar!";
  } else if (userMessage.toLowerCase().includes("qual é o seu nome")) {
    response = "Eu sou YcaroMind, seu assistente inteligente!";
  } else if (userMessage.toLowerCase().includes("adeus") || userMessage.toLowerCase().includes("tchau")) {
    response = "Tchau! Volte quando precisar de ajuda.";
  } else if (userMessage.toLowerCase().includes("memória")) {
    response = "Aqui estão as últimas mensagens que você me enviou: " + memory.join(", ");
  }

  // Adicionar a resposta à conversa
  addMessage("YcaroMind: " + response, "bot");
}