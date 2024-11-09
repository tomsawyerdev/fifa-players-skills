# TODO: Esto hay que mejorarlo
echo "** Creating default DB and users"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE USER '$MYSQL_USER'@'%' IDENTIFIED WITH mysql_native_password BY '$MYSQL_PASS'; 
 GRANT SELECT  ON $MYSQL_DATABASE.teams TO '$MYSQL_USER'@'%';
 GRANT SELECT  ON $MYSQL_DATABASE.users TO '$MYSQL_USER'@'%';
 GRANT SELECT  ON $MYSQL_DATABASE.countries TO '$MYSQL_USER'@'%';
 GRANT ALL  ON $MYSQL_DATABASE.players TO '$MYSQL_USER'@'%';
 FLUSH PRIVILEGES;"
echo "** Finished creating default DB and users"
