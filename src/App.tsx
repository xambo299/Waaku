import React, { useState, useEffect } from 'react';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import ProfileSettings from './components/ProfileSettings';
import StatusList from './components/StatusList';
import FriendProfile from './components/FriendProfile';
import Login from './components/Login';
import Register from './components/Register';
import { MessageCircle, Settings, Home } from 'lucide-react';
import { supabase } from './lib/supabase';

interface User {
  id: number;
  name: string;
  username: string;
  status: string;
  avatar: string;
}

interface Conversation {
  id: number;
  name: string;
  last_message: string;
}

interface Status {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  timestamp: string;
  likes_count: number;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: string;
  is_blocked: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
      } else if (data) {
        setUser(data);
        fetchConversations();
        fetchStatuses();
        fetchFriends();
      }
    }
  };

  const fetchConversations = async () => {
    const { data, error } = await supabase.from('conversations').select('*');
    if (error) {
      console.error('Error fetching conversations:', error);
    } else if (data) {
      setConversations(data);
    }
  };

  const fetchStatuses = async () => {
    const { data, error } = await supabase.from('statuses').select('*');
    if (error) {
      console.error('Error fetching statuses:', error);
    } else if (data) {
      setStatuses(data);
    }
  };

  const fetchFriends = async () => {
    const { data, error } = await supabase.from('friends').select('*');
    if (error) {
      console.error('Error fetching friends:', error);
    } else if (data) {
      setFriends(data);
    }
  };

  const handleLogin = (user: any) => {
    fetchUserData();
  };

  const handleRegister = (user: any) => {
    fetchUserData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return isRegistering ? (
      <Register onRegister={handleRegister} onBackToLogin={() => setIsRegistering(false)} />
    ) : (
      <Login onLogin={handleLogin} onRegister={() => setIsRegistering(true)} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4 bg-green-500 text-white flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="mr-2" />
            <h1 className="text-xl font-bold">WhatsApp Clone</h1>
          </div>
          <div className="flex items-center">
            <Home
              className="cursor-pointer mr-4"
              onClick={() => {
                setSelectedConversation(null);
                setSelectedFriend(null);
                setShowSettings(false);
              }}
            />
            <Settings
              className="cursor-pointer"
              onClick={() => setShowSettings(!showSettings)}
            />
          </div>
        </div>
        {showSettings ? (
          <ProfileSettings user={user} updateUser={setUser} />
        ) : (
          <ConversationList
            conversations={conversations}
            onSelectConversation={setSelectedConversation}
          />
        )}
      </div>
      <div className="w-2/3">
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} currentUserId={user.id} />
        ) : selectedFriend ? (
          <FriendProfile
            friend={selectedFriend}
            onBack={() => setSelectedFriend(null)}
            onStartChat={(friendId) => {
              const friend = friends.find(f => f.id === friendId);
              if (friend) {
                const existingConversation = conversations.find(c => c.id === friendId);
                if (existingConversation) {
                  setSelectedConversation(existingConversation);
                } else {
                  const newConversation: Conversation = {
                    id: friendId,
                    name: friend.name,
                    last_message: ''
                  };
                  setConversations([...conversations, newConversation]);
                  setSelectedConversation(newConversation);
                }
                setSelectedFriend(null);
              }
            }}
            onToggleBlock={(friendId) => {
              setFriends(prevFriends =>
                prevFriends.map(friend =>
                  friend.id === friendId ? { ...friend, is_blocked: !friend.is_blocked } : friend
                )
              );
              setSelectedFriend(prevFriend =>
                prevFriend && prevFriend.id === friendId
                  ? { ...prevFriend, is_blocked: !prevFriend.is_blocked }
                  : prevFriend
              );
            }}
          />
        ) : (
          <StatusList
            statuses={statuses}
            onFriendClick={(userId) => {
              const friend = friends.find(f => f.id === userId);
              if (friend) {
                setSelectedFriend(friend);
              }
            }}
            currentUserId={user.id}
          />
        )}
      </div>
    </div>
  );
}

export default App;