CREATE TABLE `rarity_master` (
  `id` int NOT NULL,
  `rarity` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `type_master` (
  `id` int NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `plan_master` (
  `id` int NOT NULL,
  `plan` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event_get_master` (
  `id` int NOT NULL,
  `event_get` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event_master` (
  `id` int NOT NULL,
  `event` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ability_master` (
  `id` int NOT NULL,
  `ability_id` varchar(100) NOT NULL,
  `ability_type` varchar(100) NOT NULL,
  `ability_trigger` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ability_id` (`ability_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `limit_break_master` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ability_id` varchar(100) NOT NULL,
  `limit_break` int NOT NULL,
  `value` varchar(50) NOT NULL,
  `rarity` int NOT NULL,
  `get_method` int NOT NULL,
  `count_limit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ability_id` (`ability_id`),
  KEY `rarity` (`rarity`),
  CONSTRAINT `limit_break_master_ibfk_1` FOREIGN KEY (`ability_id`) REFERENCES `ability_master` (`ability_id`),
  CONSTRAINT `limit_break_master_ibfk_2` FOREIGN KEY (`rarity`) REFERENCES `rarity_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cards` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rarity_id` int NOT NULL,
  `type_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `event_get_id` int NOT NULL,
  `event_1_id` int DEFAULT NULL,
  `event_2_id` int DEFAULT NULL,
  `ability_1_id` varchar(100) DEFAULT NULL,
  `ability_2_id` varchar(100) DEFAULT NULL,
  `ability_3_id` varchar(100) DEFAULT NULL,
  `ability_4_id` varchar(100) DEFAULT NULL,
  `ability_5_id` varchar(100) DEFAULT NULL,
  `ability_6_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rarity_id` (`rarity_id`),
  KEY `type_id` (`type_id`),
  KEY `plan_id` (`plan_id`),
  KEY `event_get_id` (`event_get_id`),
  KEY `event_1_id` (`event_1_id`),
  KEY `event_2_id` (`event_2_id`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`rarity_id`) REFERENCES `rarity_master` (`id`),
  CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type_master` (`id`),
  CONSTRAINT `cards_ibfk_3` FOREIGN KEY (`plan_id`) REFERENCES `plan_master` (`id`),
  CONSTRAINT `cards_ibfk_4` FOREIGN KEY (`event_get_id`) REFERENCES `event_get_master` (`id`),
  CONSTRAINT `cards_ibfk_5` FOREIGN KEY (`event_1_id`) REFERENCES `event_master` (`id`),
  CONSTRAINT `cards_ibfk_6` FOREIGN KEY (`event_2_id`) REFERENCES `event_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;