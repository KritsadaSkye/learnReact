import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs';
import LoadingSpinner from '../assets/loading-spinner.gif';
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
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ];

        setInputText('');

        sendChatMessage([
            ...newChat,
            {
                message: <img src={LoadingSpinner} width="20px" />,
                sender: 'robot',
                id: crypto.randomUUID(),
            }
        ]);

        setIsLoading(true);


        const response = await Chatbot.getResponseAsync(inputText);
        sendChatMessage([
            ...newChat,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);

        setIsLoading(false);
    }

    function clearMessages() {
        sendChatMessage([]);
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
                onClick={sendMessage}>Send
            </button>
            <button
                className="clear-button"
                onClick={clearMessages}
            >
                Clear
            </button>

        </div> //Fragment replace <div>
    );
}