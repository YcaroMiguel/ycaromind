const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    // if message = empty do nothing
    if (message === '') {
        return;
    }
    // if message = developer - show our message
    else if (message === 'developer') {
        // clear input value
        userInput.value = '';
        // append message as user - we will code it's function
        appendMessage('user', message);
        // sets a fake timeout that showing loading on send button
        setTimeout(() => {
            // send our message as bot(sender : bot)
            appendMessage('bot', 'Fui criado por Ycaro Miguel com muito carinho e dedicação');
            // change button icon to default
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    // else if none of above
    // appends users message to screen
    appendMessage('user', message);
    userInput.value = '';

    const url = 'https://deepseek-v31.p.rapidapi.com/';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '7e4f5a0f7fmsh9b0a8baa11636bdp15acc4jsn6ea3ede3dd13',
		'x-rapidapi-host': 'deepseek-v31.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		model: 'deepseek-v3',
		messages: [
			{
				role: 'user',
				content: 'There are ten birds in a tree. A hunter shoots one. How many are left in the tree?'
			}
		]
	}
};

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}

function appendMessage(sender, message) {
    info.style.display = "none";
    // change send button icon to loading using fontawesome
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // add icons depending on who send message bot or user
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
    chatLog.scrollTo = chatLog.scrollHeight;

}
