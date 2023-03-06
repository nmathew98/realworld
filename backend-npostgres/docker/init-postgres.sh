#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE IF NOT EXISTS USERS(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		username VARCHAR(20) NOT NULL UNIQUE,
		email VARCHAR(320) NOT NULL UNIQUE,
		password VARCHAR(80) NOT NULL UNIQUE,
		bio TEXT,
		image VARCHAR(2048)
	);

	CREATE TABLE IF NOT EXISTS USERS_FOLLOWS(
		origin UUID NOT NULL,
		destination UUID NOT NULL,
		is_active BOOLEAN NOT NULL,
		FOREIGN KEY (origin)
			REFERENCES USERS(uuid),
		FOREIGN KEY(destination)
			REFERENCES USERS(uuid),
		UNIQUE(origin, destination)
	);

	CREATE TABLE IF NOT EXISTS ARTICLES(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		slug VARCHAR(200) NOT NULL UNIQUE,
		title VARCHAR(200) NOT NULL UNIQUE,
		description VARCHAR(400) NOT NULL,
		body TEXT NOT NULL,
		created_at BIGINT NOT NULL,
		updated_at BIGINT NOT NULL,
		author UUID NOT NULL,
		FOREIGN KEY(author)
			REFERENCES USERS(uuid)
	);

	CREATE TABLE IF NOT EXISTS ARTICLES_FAVORITES(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		article UUID NOT NULL,
		favorited_by UUID NOT NULL,
		is_active BOOLEAN NOT NULL,
		FOREIGN KEY(article)
			REFERENCES ARTICLES(uuid),
		FOREIGN KEY(favorited_by)
			REFERENCES USERS(uuid),
		UNIQUE(article, favorited_by)
	);

	CREATE TABLE IF NOT EXISTS ARTICLES_COMMENTS(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		author UUID NOT NULL,
		article UUID NOT NULL,
		body TEXT NOT NULL,
		created_at BIGINT NOT NULL,
		updated_at BIGINT NOT NULL,
		FOREIGN KEY(author)
			REFERENCES USERS(uuid),
		FOREIGN KEY(author)
			REFERENCES ARTICLES(uuid)
	);

	CREATE TABLE IF NOT EXISTS ARTICLES_TAGS(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		tag VARCHAR(20) NOT NULL,
		article UUID NOT NULL,
		FOREIGN KEY(article)
			REFERENCES ARTICLES(uuid)
	);

	\d USERS
	\d USERS_FOLLOWS
	\d ARTICLES
	\d ARTICLES_FAVORITES
	\d ARTICLES_COMMENTS
	\d ARTICLES_TAGS
EOSQL
