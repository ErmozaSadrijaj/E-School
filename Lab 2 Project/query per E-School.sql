create database E_School

use E_School

create table prindi(
	ID int primary key identity(1,1),
	prindiID varchar(12),
	emri_mbiemri varchar(100),
	email varchar(100),
	fjalekalimi varchar(50)
)
insert into prindi values('P-123456789','emri-mbiemri','email','12345678910')
select * from prindi

create table nxenesi(
	ID int primary key identity(1,1),
	nxenesiID varchar(12),
	emri_mbiemri varchar(100),
	email varchar(100),
	fjalekalimi varchar(50),
	fotoPath varchar(1000),
	vendbanimi varchar(100),
	nrTelefonit varchar(15),
	drejtimi varchar(150),
	emriPrindit varchar(100),
	prindiID int,
	FOREIGN KEY (prindiID) REFERENCES prindi(ID),
	drejtimiID int
	FOREIGN KEY (drejtimiID) REFERENCES drejtimi(ID),

)
insert into nxenesi values('N-123456789','emri-mbiemri','email','12345678910','foto','vendbanimi','nrTel','drejtimi','emriPrindit',1,1)
select * from nxenesi

create table drejtimi(
	ID int primary key identity(1,1),
	emri varchar(255),
)

insert into drejtimi values('Shkenca Shoqerore')

create table lenda(
	ID int primary key identity(1,1),
	emri varchar(255),
	mesimdhenesi varchar(255),
	viti int,
	gjenerata varchar(50)
)

insert into lenda values('Matematike','Mesimdhenesi',1,'19/20')

select * from lenda

create table lenda_nxenesi (
	id int primary key identity(1,1),
	nxenesi varchar(255),
	lenda varchar(255),
	nxenesiID int,
	lendaID int,
	FOREIGN KEY (nxenesiID) REFERENCES nxenesi(ID),
	FOREIGN KEY (lendaID) REFERENCES lenda(ID),
)

insert into lenda_nxenesi values('emri dhe mbiemri','Matematike',1,1)