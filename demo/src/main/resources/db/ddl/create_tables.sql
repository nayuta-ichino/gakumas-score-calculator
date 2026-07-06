CREATE TABLE rarity_master (
    id INT PRIMARY KEY,
    rarity VARCHAR(50) NOT NULL
);

CREATE TABLE type_master (
    id INT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE plan_master (
    id INT PRIMARY KEY,
    plan VARCHAR(50) NOT NULL
);

CREATE TABLE event_get_master (
    id INT PRIMARY KEY,
    event_get VARCHAR(100) NOT NULL
);

CREATE TABLE event_master (
    id INT PRIMARY KEY,
    event VARCHAR(100) NOT NULL
);

CREATE TABLE cards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    rarity_id INT NOT NULL,
    type_id INT NOT NULL,
    plan_id INT NOT NULL,
    event_get_id INT NOT NULL,
    event_1_id INT NULL,
    event_2_id INT NULL,

    FOREIGN KEY (rarity_id) REFERENCES rarity_master(id),
    FOREIGN KEY (type_id) REFERENCES type_master(id),
    FOREIGN KEY (plan_id) REFERENCES plan_master(id),
    FOREIGN KEY (event_get_id) REFERENCES event_get_master(id),
    FOREIGN KEY (event_1_id) REFERENCES event_master(id),
    FOREIGN KEY (event_2_id) REFERENCES event_master(id)
);

CREATE TABLE card_score (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    card_id BIGINT NOT NULL,
    score INT NOT NULL,
    limit_score INT NOT NULL

    FOREIGN KEY (card_id) REFERENCES cards(id)
);