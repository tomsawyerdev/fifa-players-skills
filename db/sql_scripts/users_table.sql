DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `username` varchar(50) NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`id`));

/* Alice, secret */;
/* Bob, secret*/;



LOCK TABLES `users` WRITE;
INSERT INTO `users` (`username`,`hash`) VALUES ('Alice','$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY');  
INSERT INTO `users` (`username`,`hash`) VALUES ('Bob','$argon2id$v=19$m=4096,t=3,p=1$RrtzvESo4bkSXrWxbc530g$Lyyvcbaa3UNVymz+LMbLjN2hClM6NSRQiMJqGg4vtNY');  
UNLOCK TABLES;