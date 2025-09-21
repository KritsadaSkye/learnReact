import { useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

function App() {


  const [chatMessages, sendChatMessage] = useState([
    {
      message: 'hello chatbot',
      sender: 'user',
      id: 'id1'
    }, {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2'
    }, {
      message: 'can you get me todays date?',
      sender: 'user',
      id: 'id3'
    }, {
      message: 'Today is September 27',
      sender: 'robot',
      id: 'id4'
    }]);
  /*
  const array = React.useState([
  {
      message: 'hello chatbot',
          sender: 'user',
              id: 'id1'
  }, {
      message: 'Hello! How can I help you?',
          sender: 'robot',
              id: 'id2'
  }, {
      message: 'can you get me todays date?',
          sender: 'user',
              id: 'id3'
  }, {
      message: 'Today is September 27',
          sender: 'robot',
              id: 'id4'
  }]);
  */
  //const [chatMessages, sendChatMessage] = array;

  // const chatMessages = array[0];
  // const sendChatMessage = array[1];

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        sendChatMessage={sendChatMessage}
      />
    </div>
  );
}

export default App
