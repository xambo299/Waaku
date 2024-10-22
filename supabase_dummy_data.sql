-- Users table
INSERT INTO users (name, username, status, avatar) VALUES
('John Doe', 'johndoe', 'Hey there! I''m using WhatsApp', 'https://i.pravatar.cc/150?img=1'),
('Jane Smith', 'janesmith', 'Busy working', 'https://i.pravatar.cc/150?img=2'),
('Alice Johnson', 'alicej', 'On vacation!', 'https://i.pravatar.cc/150?img=3'),
('Bob Wilson', 'bobw', 'Available', 'https://i.pravatar.cc/150?img=4'),
('Emma Brown', 'emmab', 'In a meeting', 'https://i.pravatar.cc/150?img=5'),
('Michael Lee', 'michaell', 'At the gym', 'https://i.pravatar.cc/150?img=6'),
('Olivia Davis', 'oliviad', 'Studying for exams', 'https://i.pravatar.cc/150?img=7'),
('William Taylor', 'williamt', 'Watching a movie', 'https://i.pravatar.cc/150?img=8'),
('Sophia Anderson', 'sophiaa', 'Cooking dinner', 'https://i.pravatar.cc/150?img=9'),
('James Martinez', 'jamesm', 'Playing video games', 'https://i.pravatar.cc/150?img=10');

-- Conversations table
INSERT INTO conversations (name, last_message) VALUES
('John and Jane', 'See you tomorrow!'),
('Alice and Bob', 'Don''t forget the meeting at 2 PM'),
('Emma and Michael', 'How was your day?'),
('Olivia and William', 'Thanks for the help!'),
('Sophia and James', 'Movie night on Friday?'),
('John and Alice', 'Can you send me the report?'),
('Jane and Bob', 'Happy birthday!'),
('Michael and Olivia', 'Are you coming to the party?'),
('William and Sophia', 'I''ll be there in 10 minutes'),
('James and Emma', 'Did you watch the game last night?');

-- Statuses table
INSERT INTO statuses (user_id, user_name, content, timestamp, likes) VALUES
(1, 'John Doe', 'Just finished a great book!', '2023-04-15 10:30:00', 5),
(2, 'Jane Smith', 'Working on a new project', '2023-04-15 11:45:00', 3),
(3, 'Alice Johnson', 'Beach day with friends', '2023-04-15 13:20:00', 8),
(4, 'Bob Wilson', 'New personal best at the gym!', '2023-04-15 15:00:00', 6),
(5, 'Emma Brown', 'Excited for the weekend', '2023-04-15 16:30:00', 4),
(6, 'Michael Lee', 'Just adopted a puppy!', '2023-04-15 18:15:00', 10),
(7, 'Olivia Davis', 'Passed my final exam!', '2023-04-15 19:45:00', 7),
(8, 'William Taylor', 'Trying out a new recipe', '2023-04-15 20:30:00', 2),
(9, 'Sophia Anderson', 'Beautiful sunset today', '2023-04-15 21:00:00', 9),
(10, 'James Martinez', 'Can''t wait for the concert tomorrow', '2023-04-15 22:30:00', 5);

-- Friends table
INSERT INTO friends (name, avatar, status, is_blocked) VALUES
('Jane Smith', 'https://i.pravatar.cc/150?img=2', 'Busy working', false),
('Alice Johnson', 'https://i.pravatar.cc/150?img=3', 'On vacation!', false),
('Bob Wilson', 'https://i.pravatar.cc/150?img=4', 'Available', false),
('Emma Brown', 'https://i.pravatar.cc/150?img=5', 'In a meeting', false),
('Michael Lee', 'https://i.pravatar.cc/150?img=6', 'At the gym', false),
('Olivia Davis', 'https://i.pravatar.cc/150?img=7', 'Studying for exams', false),
('William Taylor', 'https://i.pravatar.cc/150?img=8', 'Watching a movie', false),
('Sophia Anderson', 'https://i.pravatar.cc/150?img=9', 'Cooking dinner', false),
('James Martinez', 'https://i.pravatar.cc/150?img=10', 'Playing video games', false),
('John Doe', 'https://i.pravatar.cc/150?img=1', 'Hey there! I''m using WhatsApp', false);