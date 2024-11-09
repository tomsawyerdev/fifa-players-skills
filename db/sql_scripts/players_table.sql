DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `long_name` varchar(255) NOT NULL,
  `player_face_url` varchar(255) DEFAULT NULL,
  `value_eur` int DEFAULT NULL,
  `dob` varchar(10) DEFAULT NULL,
  `height_cm` int DEFAULT NULL,
  `weight_kg` int DEFAULT NULL,
  `club_name` varchar(255) DEFAULT NULL,
  `club_jersey_number` int DEFAULT NULL,
  `nationality_name` varchar(255) DEFAULT NULL,  
  `shooting` int DEFAULT NULL,
  `passing` int DEFAULT NULL,
  `dribbling` int DEFAULT NULL,
  `defending` int DEFAULT NULL,
  `physic` int DEFAULT NULL,
  `attacking_crossing` int DEFAULT NULL,
  `attacking_finishing` int DEFAULT NULL,
  `attacking_heading_accuracy` int DEFAULT NULL,
  `attacking_short_passing` int DEFAULT NULL,
  `attacking_volleys` int DEFAULT NULL,
  `skill_dribbling` int DEFAULT NULL,
  `skill_curve` int DEFAULT NULL,
  `skill_fk_accuracy` int DEFAULT NULL,
  `skill_long_passing` int DEFAULT NULL,
  `skill_ball_control` int DEFAULT NULL,
  `movement_acceleration` int DEFAULT NULL,
  `movement_sprint_speed` int DEFAULT NULL,
  `movement_agility` int DEFAULT NULL,
  `movement_reactions` int DEFAULT NULL,
  `movement_balance` int DEFAULT NULL,
  `power_shot_power` int DEFAULT NULL,
  `power_jumping` int DEFAULT NULL,
  `power_stamina` int DEFAULT NULL,
  `power_strength` int DEFAULT NULL,
  `power_long_shots` int DEFAULT NULL,  
  `gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`));


LOAD DATA INFILE '/var/lib/mysql-files/players_data.csv' INTO TABLE players
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(long_name,player_face_url,value_eur,dob,height_cm,weight_kg,club_name,club_jersey_number,nationality_name,shooting,passing,dribbling,defending,physic,attacking_crossing,attacking_finishing,attacking_heading_accuracy,attacking_short_passing,attacking_volleys,skill_dribbling,skill_curve,skill_fk_accuracy,skill_long_passing,skill_ball_control,movement_acceleration,movement_sprint_speed,movement_agility,movement_reactions,movement_balance,power_shot_power,power_jumping,power_stamina,power_strength,power_long_shots,gender);  