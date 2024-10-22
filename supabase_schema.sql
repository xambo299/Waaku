-- Users table (already exists, no changes needed)

-- Conversations table (already exists, no changes needed)

-- Statuses table (add likes count)
ALTER TABLE statuses ADD COLUMN likes_count INT DEFAULT 0;

-- Create a new table for status likes
CREATE TABLE status_likes (
  id SERIAL PRIMARY KEY,
  status_id INT REFERENCES statuses(id),
  user_id INT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(status_id, user_id)
);

-- Create a new table for status comments
CREATE TABLE status_comments (
  id SERIAL PRIMARY KEY,
  status_id INT REFERENCES statuses(id),
  user_id INT REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a new table for messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INT REFERENCES conversations(id),
  sender_id INT REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);