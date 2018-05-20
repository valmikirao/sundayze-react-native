docker run -d --name humhub-db-sdz \
	-e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=humhub \
	-v/home/valmikirao/Dropbox/humub-docker-stuff/mounts/mysql:/var/lib/mysql \
	mariadb:10.2

docker run --name humhub-sdz --link humhub-db-sdz:db -d -p 80:80 \
	-v/home/valmikirao/Dropbox/humub-docker-stuff/mounts/modules:/var/www/localhost/htdocs/protected/modules  \
	-v/home/valmikirao/Dropbox/humub-docker-stuff/mounts/uploads:/var/www/localhost/htdocs/uploads  \
	-v/home/valmikirao/Dropbox/humub-docker-stuff/mounts/config:/var/www/localhost/htdocs/protected/config \
	mriedmann/humhub:1.2.6