import { useState } from 'react';
import { getPregnancyAdvice } from '../services/aiService';

/**
 * AI Chat component for pregnancy advice
 */
const AIChatBox = ({ trimester = 'first' }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const userQuery = query;
    setQuery('');

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', message: userQuery }]);

    try {
      const aiResponse = await getPregnancyAdvice(userQuery, trimester);
      setResponse(aiResponse);
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: 'Sorry, I encountered an error. Please try again later.',
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-xl font-bold mb-4 text-pink-600">Ask Your Pregnancy Assistant</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 h-64 md:h-80 overflow-y-auto mb-4">
        {chatHistory.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            <p>No messages yet. Ask a question about your pregnancy!</p>
            <p className="text-sm mt-2">Examples:</p>
            <ul className="text-sm mt-1">
              <li>"What foods should I avoid during pregnancy?"</li>
              <li>"Is it normal to feel dizzy in the first trimester?"</li>
              <li>"How can I relieve back pain?"</li>
            </ul>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`mb-3 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  chat.type === 'user' 
                    ? 'bg-pink-600 text-white' 
                    : chat.isError 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-200 text-gray-800'
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="text-left mb-3">
            <div className="inline-block rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your pregnancy..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`bg-pink-600 text-white px-4 py-2 rounded-lg ${
            loading || !query.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatBox;