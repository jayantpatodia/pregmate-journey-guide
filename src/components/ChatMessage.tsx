
import React from 'react';

export type MessageType = 'user' | 'ai';

interface ChatMessageProps {
  message: string;
  type: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, type }) => {
  return (
    <div 
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`
          max-w-[80%] p-3 rounded-2xl
          ${type === 'user' 
            ? 'bg-pregbuddy-dark text-white rounded-tr-none' 
            : 'bg-pregbuddy-light text-pregbuddy-dark rounded-tl-none'}
        `}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
