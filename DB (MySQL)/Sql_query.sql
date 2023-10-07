CREATE DATABASE DBAPI

GO

USE DBAPI

GO
CREATE TABLE USER(
IdUser int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Name varchar(20),
Password varchar(50),
Email varchar(50)
)

go

CREATE TABLE MOVIE(
IdMovie int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
IdApi int,
Title varchar(50),
Description varchar(300),
IdUser int unsigned,
FOREIGN KEY (IdUser) REFERENCES USER(IdUser)
)

insert into USER(Name,Password,Email) values
('Shiwirockztar','a','shiwirockztar@gmail.com'),
('Cinefilo','1234567','Cinefilor@hotmail.com')

insert into MOVIE(IdApi,Title,Description,IdUser) values
(278,'The Shawshank Redemption','Dos hombres encarcelados se unen durante varios años, encontrando consuelo y eventual redención a través de actos de decencia común.',1)


SELECT * FROM MOVIE

SELECT * FROM USER