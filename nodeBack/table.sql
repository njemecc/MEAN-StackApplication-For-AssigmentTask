create table user(
    id int primary key AUTO_INCREMENT,
    user_name varchar(250),
    password varchar(250),
    role varchar(20),
    UNIQUE (user_name)
);

insert into user(user_name,password,role) values ("admin",'cokolada123','admin');