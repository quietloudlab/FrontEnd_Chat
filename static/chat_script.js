document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const messageArea = document.getElementById('message-area');

    sendButton.addEventListener('click', () => {
        const message = inputArea.value.trim();
        if (message) {
            displayMessage(message, 'user');
            sendMessageToServer(message);
            inputArea.value = ''; // Clear input field
        }
    });

    function sendMessageToServer(message) {
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.response, 'bot');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageArea.appendChild(messageDiv);
    }
});