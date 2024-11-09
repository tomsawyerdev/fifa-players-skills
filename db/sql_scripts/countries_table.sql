DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `name` varchar(50) NOT NULL,
  
  PRIMARY KEY (`id`));


LOAD DATA INFILE '/var/lib/mysql-files/countries_data.csv' INTO TABLE countries
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(name);


