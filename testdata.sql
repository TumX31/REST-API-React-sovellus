-- create_db.sql
CREATE DATABASE IF NOT EXISTS athletesdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE athletesdb;

DROP TABLE IF EXISTS athletes;

CREATE TABLE athletes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nick_name VARCHAR(100),
  birth_date DATE,
  weight DECIMAL(6,2),
  image_url VARCHAR(512),
  sport VARCHAR(100),
  achievements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- seed
INSERT INTO athletes (first_name, last_name, nick_name, birth_date, weight, image_url, sport, achievements)
VALUES
('Paavo', 'Nurmi', 'Paavo', '1897-06-13', 60.0, 'https://www.todayifoundout.com/wp-content/uploads/2017/11/rick-astley.png', 'Juoksu', 'Useita olympiakultia'),
('Katri', 'Syrjä', 'Katri', '1994-03-05', 65.5, 'https://www.todayifoundout.com/wp-content/uploads/2017/11/rick-astley.png', 'Hiihto', 'Suomen mestaruuksia');
