

create table reginfo(
  name varchar(26) primary key,
  pass varchar(16) not null   
)
alter table reginfo add column phone varchar(11);