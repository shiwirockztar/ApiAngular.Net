CREATE DATABASE DBAPI

GO

USE DBAPI

GO

CREATE TABLE MOVIE(
IdMovie int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Title varchar(50),
Description varchar(50)
)

go

CREATE TABLE USER(
IdUser int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Name varchar(20),
Password varchar(50),
Email varchar(50),
IdMovie int unsigned,
FOREIGN KEY (IdMovie) REFERENCES MOVIE(IdMovie)
)

insert into MOVIE(Title,Description) values
('Origen','Comienzo ...')

insert into USER(Name,Password,Email,IdMovie) values
('Shiwirockztar','a','shiwirockztar@gmail.com',1),
('Cinefilo','1234567','Cinefilor@hotmail.com',1)

SELECT * FROM MOVIE

SELECT * FROM USER