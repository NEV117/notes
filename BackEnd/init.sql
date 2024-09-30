-- Crear tabla users
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(255),
    password VARCHAR(255),
    user_role VARCHAR(255),
    username VARCHAR(255)
);

-- Insertar datos en la tabla users
INSERT INTO users (id, email, name, password, user_role, username)
VALUES (1, 'admin@gmail.com', 'admin', '$2a$10$jebsXUprQ5np.vQ7fmuVL.W3Voe1EGJeMKY7VeUedMMxbJYjla3Qy', 'USER', 'admin');

INSERT INTO users (id, email, name, password, user_role, username)
VALUES (2, 'nev@gmail.com', 'nev', '$2a$10$jebsXUprQ5np.vQ7fmuVL.W3Voe1EGJeMKY7VeUedMMxbJYjla3Qy', 'USER', 'nev');

INSERT INTO users (id, email, name, password, user_role, username)
VALUES (3, 'jhonDoe@gmail.com', 'jhonDoe', '$2a$10$jebsXUprQ5np.vQ7fmuVL.W3Voe1EGJeMKY7VeUedMMxbJYjla3Qy', 'USER', 'jhonDoe');

-- Crear tabla categories
CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Insertar datos en la tabla categories
INSERT INTO categories (category_id, name)
VALUES
  (1, 'Needs'),
  (2, 'To Do'),
  (3, 'Would Like'),
  (24, 'test');

-- Crear tabla notes
CREATE TABLE notes (
    note_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id), -- Se refiere a la clave primaria en la tabla users
    title VARCHAR(255) NOT NULL,
    content TEXT,
    categories VARCHAR(255)[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT TRUE,
    archive BOOLEAN DEFAULT FALSE
);

-- Insertar datos en la tabla notes
INSERT INTO notes (active, archive, created_at, note_id, updated_at, user_id, title, categories, content)
VALUES
  (false, true, '2024-08-17 16:51:32.004391+00', 5, null, 1, 'Note 2', '{1,2,3}', 'Lorem ipsum dolor sit amet. It is tempting to not write anything'),
  (false, true, '2024-08-17 21:13:44.077637+00', 8, '2024-08-19 04:55:09.975122+00', 1, 'Head Phones [Edit]', '{1,3}', 'need some new headphones'),
  (false, true, '2024-08-18 12:11:27.411647+00', 11, '2024-08-19 04:55:09.975122+00', 1, 'Another Note', '{2,4}', 'This is another note with different content and categories'),
  (true, false, '2024-08-19 04:55:09.975122+00', 13, null, 2, 'yet another test', '{1,2}', 'You see, there''s a description to go with it'),
  (true, false, '2024-08-19 16:39:36.525395+00', 14, '2024-08-18 09:46:54.089491+00', 1, '4-Line Test', '{1,3}', 'Text here from frontend'),
  (true, false, '2024-08-20 06:38:09.168898+00', 15, '2024-08-20 09:46:54.089491+00', 1, 'Note 1 [Edit]', '{2,2}', 'Lorem ipsum dolor sit amet. It is tempting to not write anything'),
  (true, false, '2024-08-20 17:31:21.033204+00', 16, null, 2, 'Random Note', '{1}', 'Weeeee'),
  (false, true, '2024-08-21 16:26:00.182630+00', 17, '2024-08-20 09:46:54.089491+00', 2, 'Note 1 [Edit]', '{2,3}', 'Andy just commented & voiced'),
  (false, true, '2024-08-22 16:19:28.221699+00', 18, '2024-08-19 04:55:09.975122+00', 1, 'Chocolate [Edit]', '{2,3,4}', 'Should buy some chocolate on my way home'),
  (false, true, '2024-08-23 10:23:06.363260+00', 19, '2024-08-18 09:46:54.089491+00', 1, 'TEST [FINAL]', '{2}', 'Have a great weekend on this...');
