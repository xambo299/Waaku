import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

interface User {
  name: string;
  username: string;
  status: string;
  avatar: string | null;
}

interface ProfileSettingsProps {
  user: User;
  updateUser: (updatedUser: Partial<User>) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState(user.status);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, status });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <div className="mb-4 flex justify-center">
        <div
          className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative overflow-hidden"
          onClick={handleAvatarClick}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
          ) : (
            <Camera size={32} className="text-gray-400" />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;