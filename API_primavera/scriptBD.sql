create database if not exists ejemplo00;
use ejemplo00;
create table if not exists coches (
    id int (11) not null auto_increment,
    nombre varchar(50),
    cantidad int,
    primary key (id)
);

insert into coches (nombre, cantidad) values ("Kia", 66245);
insert into coches (nombre, cantidad) values ("Hyundai", 58874);
insert into coches (nombre, cantidad) values ("Dacia", 48844);
insert into coches (nombre, cantidad) values ("Toyota",79883);
insert into coches (nombre, cantidad) values ("Peugeot",56176);
insert into coches (nombre, cantidad) values ("Volkswagen", 63871);
insert into coches (nombre, cantidad) values ("Seat",58488);
insert into coches (nombre, cantidad) values ("Renault", 53176);