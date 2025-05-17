
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatMessage, { MessageType } from '@/components/ChatMessage';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  content: string;
  type: MessageType;
}

// Sample pregnancy-related responses for demo purposes
const aiResponses = [
  "According to medical guidelines, it's completely normal to experience morning sickness during the first trimester. Try having small, frequent meals and staying hydrated to help manage symptoms. Ginger tea or candies can also provide relief.",
  "Moderate exercise is generally safe and beneficial during pregnancy. Walking, swimming, and prenatal yoga are excellent options. Always consult with your healthcare provider before starting any new exercise routine.",
  "It's recommended that pregnant women consume about 300 additional calories per day during the second and third trimesters. Focus on nutrient-dense foods like fruits, vegetables, lean proteins, and whole grains.",
  "Getting adequate rest is important during pregnancy. Try sleeping on your left side with a pillow between your knees for better comfort, especially in later stages of pregnancy.",
  "Folic acid is a crucial nutrient during pregnancy, especially in the first trimester. It helps prevent neural tube defects. Good sources include leafy greens, fortified grains, and prenatal vitamins."
];

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! I'm your PregBuddy AI assistant. How can I help you with your pregnancy journey today?", type: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    setMessages([...messages, { content: input, type: 'user' }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { content: response, type: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen pb-20 pt-4">
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-semibold text-pregbuddy-dark">Ask AI</h1>
        <p className="text-gray-500">Get answers to your pregnancy questions</p>
      </div>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto px-4 mb-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            type={message.type}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-pregbuddy-light text-pregbuddy-dark p-3 rounded-2xl rounded-tl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pregbuddy-dark rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-pregbuddy-dark rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-pregbuddy-dark rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-400 italic">
          Disclaimer: I'm an AI assistant, not a medical professional. Always consult with your healthcare provider for medical advice.
        </p>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="px-4 pb-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your pregnancy..."
          className="rounded-full"
        />
        <Button 
          type="submit" 
          className="rounded-full aspect-square p-2 bg-pregbuddy-primary text-pregbuddy-dark hover:bg-pregbuddy-dark hover:text-white"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default AskAI;
