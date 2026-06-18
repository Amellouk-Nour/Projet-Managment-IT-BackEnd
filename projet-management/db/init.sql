CREATE TYPE ticket_status AS ENUM (
    'a_faire',
    'en_cours_dev',
    'en_code_review',
    'dev_termine',
    'en_test',
    'test_valide'
);

CREATE TABLE IF NOT EXISTS utilisateur (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_story (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    criteres_acceptation TEXT,
    priorite INTEGER DEFAULT 2,
    statut VARCHAR(20) NOT NULL DEFAULT 'a_faire',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ticket (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    statut ticket_status NOT NULL DEFAULT 'a_faire',
    priorite INTEGER DEFAULT 2,
    estim_dev NUMERIC(5,1),
    estim_review NUMERIC(5,1),
    estim_test NUMERIC(5,1),
    temps_dev NUMERIC(5,1),
    temps_review NUMERIC(5,1),
    temps_test NUMERIC(5,1),
    due_at DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    user_story_id INTEGER REFERENCES user_story(id),
    assigned_to INTEGER REFERENCES utilisateur(id),
    created_by INTEGER REFERENCES utilisateur(id)
);

CREATE TABLE IF NOT EXISTS ticket_assignees (
    ticket_id INTEGER NOT NULL REFERENCES ticket(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE,
    PRIMARY KEY (ticket_id, user_id)
);
