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

CREATE TABLE ability_master (
    id INT PRIMARY KEY,
    ability_id VARCHAR(100) NOT NULL UNIQUE,
    ability_type VARCHAR(100) NOT NULL,
    ability_trigger VARCHAR(100) NOT NULL
);

CREATE TABLE limit_break_master (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ability_id VARCHAR(100) NOT NULL,
    limit_break INT NOT NULL,        -- 0〜4
    value VARCHAR(50) NOT NULL,      -- 数値 or %
    rarity INT NOT NULL,             -- SSR=3, SR=2, R=1 など
    get_method INT NOT NULL,         -- ガチャ産=1, 配布=0
    count_limit INT DEFAULT NULL,    -- 回数制限（NULLなら無制限）

    FOREIGN KEY (ability_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (rarity) REFERENCES rarity_master(id)
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
    ability_1_id  VARCHAR(100) DEFAULT NULL,
    ability_2_id  VARCHAR(100) DEFAULT NULL,
    ability_3_id  VARCHAR(100) DEFAULT NULL,
    ability_4_id  VARCHAR(100) DEFAULT NULL,
    ability_5_id  VARCHAR(100) DEFAULT NULL,
    ability_6_id  VARCHAR(100) DEFAULT NULL,

    FOREIGN KEY (rarity_id) REFERENCES rarity_master(id),
    FOREIGN KEY (type_id) REFERENCES type_master(id),
    FOREIGN KEY (plan_id) REFERENCES plan_master(id),
    FOREIGN KEY (event_get_id) REFERENCES event_get_master(id),
    FOREIGN KEY (event_1_id) REFERENCES event_master(id),
    FOREIGN KEY (event_2_id) REFERENCES event_master(id),
    FOREIGN KEY (ability_1_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (ability_2_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (ability_3_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (ability_4_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (ability_5_id) REFERENCES ability_master(ability_id),
    FOREIGN KEY (ability_6_id) REFERENCES ability_master(ability_id)
);