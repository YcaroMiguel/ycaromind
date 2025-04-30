let chatHistory = [];
let conversationContext = {};  // Para armazenar o contexto da conversa

function sendMessage() {
  const input = document.getElementById('userInput');
  const msg = input.value.trim();
  if (!msg) return;

  // Adiciona a mensagem do usuário
  addMessage(msg, 'user');
  input.value = '';

  // Delay para dar a sensação de "pensamento" do bot
  setTimeout(() => {
    // Resposta do bot após o "processamento"
    const resposta = getBotResponse(msg);
    addMessage(resposta, 'bot');
  }, 1500);  // 1.5 segundos de delay para imitar o "pensamento" do bot
}

function addMessage(text, sender) {
  const chatbox = document.getElementById('chatbox');
  const message = document.createElement('div');
  message.className = 'message ' + sender;
  message.textContent = text;
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;

  chatHistory.push({ sender, text });
  saveHistory();
}

function getBotResponse(input) {
  input = input.toLowerCase();

  // Respostas personalizadas baseadas em palavras-chave
  if (input.includes('oi') || input.includes('olá')) {
    return 'Olá! Como posso ajudar você hoje?';
  }
  if (input.includes('tchau')) {
    return 'Até logo! Volte sempre!';
  }
  if (input.includes('hora')) {
    return 'A hora certa é ' + new Date().toLocaleTimeString();
  }
  if (input.includes('ajuda')) {
    return 'Aqui estão algumas opções:\n1. Perguntar sobre a hora\n2. Dizer oi ou tchau\n3. Me fazer uma pergunta qualquer';
  }

  // Respostas inteligentes com armazenamento de contexto
  if (input.includes('meu nome') || input.includes('qual é meu nome')) {
    if (conversationContext.name) {
      return `Seu nome é ${conversationContext.name}.`;
    } else {
      return 'Desculpe, não lembro do seu nome. Pode me dizer?';
    }
  }

  if (input.includes('eu me chamo') && input.split(' ').length > 3) {
    let name = input.split(' ').pop(); // Pegando o nome após "eu me chamo"
    conversationContext.name = name;
    return `Ótimo, prazer em te conhecer, ${name}! Vou lembrar disso.`;
  }

  // Respostas sem limite de perguntas e mais interatividade
  if (input.includes('como vai')) {
    return 'Estou ótimo, obrigado por perguntar! E você?';
  }

  // Caso não entenda, oferece sugestões
  return 'Desculpe, não entendi. Precisa de ajuda? Tente perguntar sobre a hora, ou dizer oi!';
}

function saveHistory() {
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function loadHistory() {
  const storedHistory = JSON.parse(localStorage.getItem('chatHistory'));
  if (storedHistory) {
    chatHistory = storedHistory;
    chatHistory.forEach(entry => addMessage(entry.text, entry.sender));
  }
}

// Carregar o histórico de mensagens ao iniciar
window.onload = loadHistory;
