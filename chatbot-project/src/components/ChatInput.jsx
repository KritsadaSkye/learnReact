import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, sendChatMessage }) {

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function handdleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
        else if (event.key === 'Escape') {
            setInputText('');
        }
    }


    async function sendMessage() {
        if (isLoading || inputText === '') {
            return;
        }

        const newChat = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];

        setInputText('');

        sendChatMessage([
            ...newChat,
            {
                message: 'loading...',
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        setIsLoading(true);


        const response = await Chatbot.getResponseAsync(inputText);
        sendChatMessage([
            ...newChat,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        setIsLoading(false);
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Send a Message to Chatbot"
                onChange={saveInputText}
                value={inputText}

                onKeyDown={handdleKeyDown}
            />
            <button
                className="send-button"
                onClick={sendMessage}>Send</button>
        </div> //Fragment replace <div>
    );
}