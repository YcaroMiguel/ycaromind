const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const buttonIcon = document.getElementById('button-icon');
const info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.value = '';

    buttonIcon.classList.remove('fa-paper-plane');
    buttonIcon.classList.add('fa-spinner', 'fa-pulse');

    callDeepSeekAPI(message);
}

function appendMessage(sender, message) {
    info.style.display = "none";

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function callDeepSeekAPI(userMessage) {
    const url = 'https://deepseek-v31.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '7e4f5a0f7fmsh9b0a8baa11636bdp15acc4jsn6ea3ede3dd13',
            'x-rapidapi-host': 'deepseek-v31.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-v3',
            messages: [
                {
                    role: 'user',
                    content: userMessage
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const reply = result?.choices?.[0]?.message?.content || "Desculpe, não consegui responder agora.";
        appendMessage('bot', reply);

    } catch (error) {
        console.error(error);
        appendMessage('bot', '❌ Erro ao acessar a API. Verifique a chave ou conexão.');
    } finally {
        buttonIcon.classList.remove('fa-spinner', 'fa-pulse');
        buttonIcon.classList.add('fa-paper-plane');
    }
}
