-- CREATE TABLE card(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(50) NOT NULL,
--     rarity VARCHAR(50) NOT NULL,
--     type VARCHAR(50) NOT NULL,
--     base_score INT NOT NULL, 
--     score_per_limit_break INT NOT NULL 
-- );

INSERT INTO card(name, rarity, type, base_score, score_per_limit_break)
    values('TEST1', 'SSR', 'Vocal', 1, 3);
INSERT INTO card(name, rarity, type, base_score, score_per_limit_break)
    values('TEST2', 'SR', 'Dance', 2, 8);
INSERT INTO card(name, rarity, type, base_score, score_per_limit_break)
    values('TEST3', 'SSR', 'Visial', 5, 2);