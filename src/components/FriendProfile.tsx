import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, UserX, UserCheck, ThumbsUp, Share2, MessageSquare } from 'lucide-react';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: string;
  is_blocked: boolean;
}

interface FriendProfileProps {
  friend: Friend;
  onBack: () => void;
  onStartChat: (friendId: number) => void;
  onToggleBlock: (friendId: number) => void;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ friend, onBack, onStartChat, onToggleBlock }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-green-500 text-white p-4 flex items-center">
        <ArrowLeft className="cursor-pointer mr-4" onClick={onBack} />
        <h2 className="text-xl font-semibold">{friend.name}'s Profile</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center mb-4">
            <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{friend.name}</h3>
              <p className="text-gray-600">{friend.status}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onStartChat(friend.id)}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <MessageCircle className="mr-2" size={20} />
              Start Chat
            </button>
            <button
              onClick={() => onToggleBlock(friend.id)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                friend.is_blocked
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                  : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400'
              }`}
            >
              {friend.is_blocked ? (
                <UserCheck size={20} className="text-white" />
              ) : (
                <UserX size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;