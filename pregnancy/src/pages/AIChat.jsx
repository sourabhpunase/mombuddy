import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader } from 'lucide-react';
import aiService from '../services/aiService.js';
import CareOverviewPanel from '../components/CareOverviewPanel.jsx';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI pregnancy companion. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendText = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { id: Date.now(), text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botText = await aiService.sendMessage(trimmed, {});
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiService.getFallbackResponse(trimmed, {}), sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What are normal first trimester symptoms?",
    "What foods should I avoid?",
    "Is it safe to exercise during pregnancy?",
    "When should I call my doctor?"
  ];

  return (
    <div className="page-shell max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-[var(--care-text)] dark:text-white"
      >
        AI Pregnancy Assistant
      </motion.h1>

      <CareOverviewPanel
        className="mb-6"
        title="AI support"
        summary="The same weekly context stays visible while you ask questions, so guidance never feels disconnected from your routine."
      />

      <div className="card-surface overflow-hidden flex flex-col min-h-[28rem] sm:min-h-[32rem] max-h-[calc(100vh-8rem)]">
        <div
          ref={messagesContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-4 overscroll-contain"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[min(100%,28rem)] sm:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-[#b27d93]' : 'bg-[#8f7287]'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm sm:text-base ${
                    message.sender === 'user'
                      ? 'bg-[#b27d93] text-white'
                      : 'bg-[var(--care-surface-muted)] dark:bg-white/5 text-[var(--care-text)] dark:text-slate-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.text}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#8f7287] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[var(--care-surface-muted)] dark:bg-white/5 px-4 py-2 rounded-2xl">
                  <Loader className="w-4 h-4 animate-spin text-[#8f7287] dark:text-[#dfc4cf]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6 py-3 bg-[var(--care-surface-muted)] dark:bg-white/5 border-t border-[var(--care-border)] dark:border-white/10">
          <p className="text-xs sm:text-sm text-body mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => sendText(question)}
                disabled={isLoading}
                className="text-left text-xs sm:text-sm bg-white dark:bg-white/5 px-3 py-2 rounded-full border border-[var(--care-border)] dark:border-white/10 hover:bg-[var(--care-surface-muted)] dark:hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-[var(--care-border)] dark:border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendText(input)}
              placeholder="Ask me anything about pregnancy..."
              className="input-field rounded-full flex-1"
            />
            <button
              type="button"
              onClick={() => sendText(input)}
              disabled={!input.trim() || isLoading}
              className="shrink-0 bg-gradient-to-r from-[#c28aa0] to-[#8f7287] text-white p-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 self-end sm:self-auto"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
