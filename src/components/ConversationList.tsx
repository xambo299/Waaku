import React from 'react';

interface Conversation {
  id: number;
  name: string;
  last_message: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, onSelectConversation }) => {
  return (
    <div className="overflow-y-auto h-full">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="p-4 hover:bg-gray-100 cursor-pointer border-b"
          onClick={() => onSelectConversation(conversation)}
        >
          <h2 className="font-semibold">{conversation.name}</h2>
          <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;