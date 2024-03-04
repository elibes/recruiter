-- Create language table
CREATE TABLE language (
    language_id SERIAL PRIMARY KEY,
    code VARCHAR(2) NOT NULL UNIQUE
);

-- Create translation table
CREATE TABLE translation (
    translation_id SERIAL PRIMARY KEY,
    competence_id INTEGER NOT NULL REFERENCES competence(competence_id),
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    name VARCHAR(255) NOT NULL
);


-- Insert language entries
INSERT INTO language (code) VALUES ('en'), ('sv');


-- Insert English translations
INSERT INTO translation (competence_id, language_id, name)
VALUES
(1, (SELECT language_id FROM language WHERE code = 'en'), 'Ticket Sales'),
(2, (SELECT language_id FROM language WHERE code = 'en'), 'Lotteries'),
(3, (SELECT language_id FROM language WHERE code = 'en'), 'Roller Coaster Operation');

-- Insert Swedish translations
INSERT INTO translation (competence_id, language_id, name)
VALUES
(1, (SELECT language_id FROM language WHERE code = 'sv'), 'Biljettförsäljning'),
(2, (SELECT language_id FROM language WHERE code = 'sv'), 'Lotterier'),
(3, (SELECT language_id FROM language WHERE code = 'sv'), 'Berg-och Dalbanan Drift');
