create database brl;

use brl;

create table criterios (
id int not null auto_increment,
seguros int,
inseguros int,
noAplica boolean,
Insg boolean, 
Men boolean, 
Moder boolean, 
Mayor boolean,
primary key (id) 
);

create table criterios (
id int not null auto_increment,
criterioNum int,
seguros int,
inseguros int,
noAplica boolean not null,
potencial varchar(9) not null, 
primary key (id) 
);

insert into criterios(criterioNum,seguros,inseguros,noAplica,potencial )
values
(1, 2, 1, true, "Mayor"),
(2, 2, 1, false, "Menor"),
(3, 0, 1, true, "Moderado"),
(4, 2, 1, true, "Inseguro"),
(5, 2, 1, true, "Mayor"),
(6, 2, 1, false, "Menor"),
(7, 0, 1, true, "Moderado"),
(8, 2, 1, true, "Inseguro"),
(9, 2, 1, false, "Mayor"),
(10, 2, 1, false, "Menor"),
(11, 0, 1, true, "Moderado"),
(12, 2, 1, true, "Inseguro"),
(13, 2, 1, false, "Mayor"),
(14, 2, 1, false, "Menor"),
(15, 0, 1, true, "Moderado");

select * from criterios;

create table cr (
id int not null auto_increment,
crNum int,
created_by int not null,
primary key (id),
foreign key (created_by) references criterios (id) 
);

insert into cr(crNum,created_by)
values
(5, 12),
(3, 8),
(7, 3),
(2, 6),
(6, 10),
(9, 1),
(4, 11),
(1, 9),
(8, 10),
(5, 14),
(3, 2),
(7, 13),
(9, 5);

select * from cr;

select c.id, c.criterioNum, c.potencial,cri.crNum from criterios c left join cr cri on c.id=cri.created_by;