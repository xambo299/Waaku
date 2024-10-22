import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Conversation {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUserId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel(`conversation:${conversation.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleNewMessage)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversation.id]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const handleNewMessage = (payload: any) => {
    setMessages((prevMessages) => [...prevMessages, payload.new]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_id: currentUserId,
          content: message.trim(),
        });

      if (error) {
        console.error('Error sending message:', error);
      } else {
        setMessage('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-green-500 text-white p-4">
        <h2 className="text-xl font-semibold">{conversation.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.sender_id === currentUserId ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.sender_id === currentUserId
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;