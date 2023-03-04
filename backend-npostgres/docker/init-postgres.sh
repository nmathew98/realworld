#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE realworld;
	\c realworld

	CREATE TABLE IF NOT EXISTS USERS(
		uuid UUID NOT NULL UNIQUE PRIMARY KEY,
		username VARCHAR(20) NOT NULL UNIQUE,
		email VARCHAR(320) NOT NULL UNIQUE,
		password VARCHAR(20) NOT NULL,
		bio TEXT
	);

	CREATE TABLE IF NOT EXISTS USERS_FOLLOWS(
		origin UUID NOT NULL,
		destination UUID NOT NULL,
		isActive BOOLEAN NOT NULL,
		FOREIGN KEY (origin)
			REFERENCES USERS(uuid),
		FOREIGN KEY(destination)
			REFERENCES USERS(uuid)
	);

	\d USERS
	\d USERS_FOLLOWS
EOSQL
