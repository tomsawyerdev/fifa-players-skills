DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `country` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,  
  PRIMARY KEY (`id`));


LOAD DATA INFILE '/var/lib/mysql-files/teams_data.csv' INTO TABLE teams
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(country,name);


