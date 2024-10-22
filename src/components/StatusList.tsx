import React, { useState } from 'react';
import { ThumbsUp, Share2, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Status {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  timestamp: string;
  likes_count: number;
}

interface StatusListProps {
  statuses: Status[];
  onFriendClick: (userId: number) => void;
  currentUserId: number;
}

const StatusList: React.FC<StatusListProps> = ({ statuses, onFriendClick, currentUserId }) => {
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleStatusAction = async (action: 'like' | 'share' | 'reply', statusId: number) => {
    if (action === 'like') {
      const { data, error } = await supabase
        .from('status_likes')
        .upsert({ status_id: statusId, user_id: currentUserId }, { onConflict: 'status_id,user_id' });

      if (error) {
        console.error('Error liking status:', error);
      } else {
        // Update likes count in the UI
        // You might want to fetch the updated status or update the local state
      }
    } else if (action === 'share') {
      // Implement share functionality (e.g., copy link to clipboard)
      console.log(`Shared status ${statusId}`);
    } else if (action === 'reply') {
      setShowReplyInput(statusId);
    }
  };

  const handleReplySubmit = async (statusId: number) => {
    if (replyText.trim()) {
      const { data, error } = await supabase
        .from('status_comments')
        .insert({ status_id: statusId, user_id: currentUserId, content: replyText });

      if (error) {
        console.error('Error submitting comment:', error);
      } else {
        console.log('Comment submitted successfully');
        // You might want to fetch the updated comments or update the local state
      }
    }
    setShowReplyInput(null);
    setReplyText('');
  };

  const handleClickOutside = () => {
    setShowReplyInput(null);
    setReplyText('');
  };

  return (
    <div className="h-full overflow-y-auto p-4" onClick={handleClickOutside}>
      <h2 className="text-2xl font-bold mb-4">Friend Statuses</h2>
      {statuses.map((status) => (
        <div key={status.id} className="mb-4 bg-white rounded-lg shadow-md p-4">
          <h3
            className="font-semibold text-green-600 mb-1 cursor-pointer hover:underline"
            onClick={() => onFriendClick(status.user_id)}
          >
            {status.user_name}
          </h3>
          <p className="text-gray-700 mb-2">{status.content}</p>
          <p className="text-xs text-gray-500 mb-2">{new Date(status.timestamp).toLocaleString()}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{status.likes_count} likes</span>
            <div className="flex space-x-2">
              <ThumbsUp
                size={16}
                className="cursor-pointer text-gray-500 hover:text-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusAction('like', status.id);
                }}
              />
              <Share2
                size={16}
                className="cursor-pointer text-gray-500 hover:text-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusAction('share', status.id);
                }}
              />
              <MessageCircle
                size={16}
                className="cursor-pointer text-gray-500 hover:text-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusAction('reply', status.id);
                }}
              />
            </div>
          </div>
          {showReplyInput === status.id && (
            <div className="mt-2 flex" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply to status..."
                className="flex-1 border rounded-l-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                onClick={() => handleReplySubmit(status.id)}
                className="bg-green-500 text-white px-2 py-1 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                Send
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusList;