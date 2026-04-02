import { useState, useRef, useEffect } from 'react';
import aiService from '../services/aiService.js';

const trimesterContext = {
  first: { week: 8 },
  second: { week: 20 },
  third: { week: 34 }
};

/**
 * AI Chat component for pregnancy advice (trimester pages)
 */
const AIChatBox = ({ trimester = 'first' }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const userQuery = query;
    setQuery('');
    setChatHistory((prev) => [...prev, { type: 'user', message: userQuery }]);

    try {
      const ctx = trimesterContext[trimester] || { week: 12 };
      const aiResponse = await aiService.sendMessage(userQuery, ctx);
      setChatHistory((prev) => [...prev, { type: 'ai', message: aiResponse }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'ai',
          message: 'Sorry, I encountered an error. Please try again later.',
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-surface rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-xl font-bold mb-4 text-pink-600 dark:text-pink-400">Ask Your Pregnancy Assistant</h3>

      <div
        ref={scrollRef}
        className="surface-muted rounded-lg p-4 h-64 md:h-80 overflow-y-auto overscroll-contain mb-4"
      >
        {chatHistory.length === 0 ? (
          <div className="text-muted text-center py-10 text-sm">
            <p>No messages yet. Ask a question about your pregnancy!</p>
            <p className="text-xs mt-2 font-medium text-gray-700 dark:text-slate-300">Examples:</p>
            <ul className="text-xs mt-1 text-left max-w-xs mx-auto space-y-1">
              <li>&quot;What foods should I avoid?&quot;</li>
              <li>&quot;Is dizziness normal in the first trimester?&quot;</li>
              <li>&quot;How can I relieve back pain?&quot;</li>
            </ul>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className={`mb-3 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[85%] text-sm ${
                  chat.type === 'user'
                    ? 'bg-pink-600 text-white'
                    : chat.isError
                      ? 'bg-red-100 dark:bg-red-950/60 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100'
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="text-left mb-3">
            <div className="inline-block rounded-lg px-4 py-2 bg-gray-200 dark:bg-slate-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-slate-400 animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-gray-500 dark:bg-slate-400 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-gray-500 dark:bg-slate-400 animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your pregnancy..."
          className="input-field flex-1 sm:min-w-0"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`shrink-0 bg-pink-600 dark:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium ${
            loading || !query.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700 dark:hover:bg-pink-500'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatBox;
