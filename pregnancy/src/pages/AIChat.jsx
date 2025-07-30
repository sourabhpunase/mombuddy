import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI pregnancy companion. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Use AI service
      const response = await fetch('http://localhost:5000/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      
      const data = await response.json();
      const botResponse = data.response || generateAIResponse(currentInput);
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('AI Error:', error);
      const fallbackResponse = generateAIResponse(currentInput);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: fallbackResponse, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      'symptoms': "I can help you track and understand pregnancy symptoms. Common first trimester symptoms include morning sickness, fatigue, and breast tenderness. Would you like specific advice about any symptoms you're experiencing?",
      'nutrition': "Proper nutrition is crucial during pregnancy. Focus on folate, iron, calcium, and protein. Avoid raw fish, unpasteurized dairy, and limit caffeine. Would you like a personalized meal plan?",
      'exercise': "Gentle exercise like walking, swimming, and prenatal yoga are great during pregnancy. Always consult your doctor before starting any new exercise routine. What type of activities interest you?",
      'trimester': "Each trimester brings unique changes. First trimester focuses on organ development, second trimester is often the most comfortable, and third trimester prepares for birth. Which trimester are you in?",
      'default': "I'm here to support your pregnancy journey with evidence-based information. I can help with symptoms, nutrition, exercise, and general pregnancy questions. What would you like to know more about?"
    };

    const lowerInput = userInput.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) return response;
    }
    return responses.default;
  };

  const quickQuestions = [
    "What are normal first trimester symptoms?",
    "What foods should I avoid?",
    "Is it safe to exercise during pregnancy?",
    "When should I call my doctor?"
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          AI Pregnancy Assistant
        </motion.h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-pink-600' : 'bg-purple-600'
                  }`}>
                    {message.sender === 'user' ? 
                      <User className="w-4 h-4 text-white" /> : 
                      <Bot className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <Loader className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-xs bg-white px-3 py-1 rounded-full border hover:bg-pink-50 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about pregnancy..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;