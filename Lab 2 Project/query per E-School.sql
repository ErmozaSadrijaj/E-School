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

create table stafi(
	ID int primary key identity(1,1),
	stafiID varchar(12),
	emri_mbiemri varchar(100),
	fjalekalimi varchar(50),
	email varchar(100),
	fotoPath varchar(1000),
	nrTelefonit varchar(15),
	vendbanimi varchar(100),
	Kualifikimi varchar(100),
	roli varchar(50)
)

insert into stafi values('M-123456789','emri_mbiemri','12344','email@gmail.com','foto','+38349611555','vendbanimi','kualifikimi','mesimdhenes')
select * from stafi

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
	mesimdhenesiID int,
	FOREIGN KEY (mesimdhenesiID) REFERENCES stafi(ID),

)


insert into nxenesi values('N-123456789','emri-mbiemri','email','12345678910','foto','vendbanimi','nrTel','drejtimi','emriPrindit',1,1,1)
insert into nxenesi values('N-123226789','emri-mbiemri2','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,1)

insert into nxenesi values('N-123226289','Nxenesi 3','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,2)
insert into nxenesi values('N-123256789','Nxenesi 4','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,1)
insert into nxenesi values('N-121226789','Nxenesi 5','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,2)
insert into nxenesi values('N-123229789','Nxenesi 6','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,2)
insert into nxenesi values('N-123226709','Nxenesi 7','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,2)
insert into nxenesi values('N-103226789','Nxenesi 8','email2','12345678910','foto2','vendbanimi2','nrTel2','drejtimi2','emriPrindit2',1,1,1)


select * from nxenesi


create table drejtimi(
	ID int primary key identity(1,1),
	emri varchar(255),
)

insert into drejtimi values('Shkenca Shoqerore')

create table lenda(
	ID int primary key identity(1,1),
	emri varchar(255),
	mesimdhenesi int,
	foreign key (mesimdhenesi) references stafi(ID),
	viti int,
	gjenerata varchar(50)
)
select * from lenda where mesimdhenesi = 2

insert into lenda values('Matematike',1,1,'19/20')
insert into lenda values('Fizik',1,1,'19/20')
insert into lenda values('Kimi',1,1,'19/20')
insert into lenda values('Matematike',1,2,'19/20')
insert into lenda values('Fizik',1,2,'19/20')
insert into lenda values('Kimi',2,3,'19/20')
insert into lenda values('Matematike',1,3,'19/20')
insert into lenda values('Fizik',1,3,'19/20')
insert into lenda values('Kimi',1,3,'19/20')
insert into lenda values('Astrologji',1,3,'19/20')

select * from lenda
select l.ID,emri,s.emri_mbiemri,s.stafiID,viti,gjenerata from dbo.lenda l
join stafi s on s.ID = l.mesimdhenesi
create table lenda_nxenesi (
	ID int primary key identity(1,1),
	nxenesiID int,
	lendaID int,
	FOREIGN KEY (nxenesiID) REFERENCES nxenesi(ID),
	FOREIGN KEY (lendaID) REFERENCES lenda(ID),
)

insert into lenda_nxenesi values('emri dhe mbiemri','Matematike',1,1)
insert into lenda_nxenesi values('emri dhe mbiemri2','Fizik',2,2)
insert into lenda_nxenesi values('emri dhe mbiemri','Kimi',1,11)
insert into lenda_nxenesi values('emri dhe mbiemri','Fizik',1,5)

insert into lenda_nxenesi values('nxenesi 2','Fizik',2,5)
insert into lenda_nxenesi values('nxenesi 3','Fizik',3,5)
insert into lenda_nxenesi values('nxenesi 4','Fizik',4,5)
insert into lenda_nxenesi values('nxenesi 5','Fizik',5,5)
insert into lenda_nxenesi values('nxenesi 6','Fizik',6,5)




select distinct ln.ID, ln.nxenesi,ln.lenda,ln.nxenesiID,ln.lendaID,l.viti from lenda_nxenesi ln inner join lenda l
on l.ID = ln.lendaID where ln.nxenesiID = 1

/*lendet e nje nxenesi*/
select distinct l.viti,l.emri from nxenesi nx
join lenda_nxenesi ln on nx.ID = ln.nxenesiID
join lenda l on ln.lendaID = l.ID
join stafi s on s.ID = l.mesimdhenesi
where s.ID = 1 and s.roli = 'mesimdhenes' and nx.nxenesiID = 'N-123456789'
/* mesimdhenesit e nje nxenesi*/
select distinct s.emri_mbiemri,s.stafiID from stafi s
join lenda l on s.ID = l.mesimdhenesi
join lenda_nxenesi ln on ln.lendaID = l.ID
where ln.nxenesiID = 1
/*lendet e mesimdhenesit*/
select distinct l.ID,l.emri,l.viti from lenda l 
join stafi s on s.ID = l.mesimdhenesi
where s.ID = 1



create table dokumentet(
	ID int primary key identity(1,1),
	titulli varchar(255),
	linku varchar(350),
	dataPublikimit datetime,
	lendaID int,
	FOREIGN KEY (lendaID) REFERENCES lenda(ID),
)

insert into dokumentet values ('Hyrje ne Lende','linku','2023-02-05 15:20:02',1)
insert into dokumentet values ('Tema 1 e lendes','linku','2023-02-12 15:20:02',1)
insert into dokumentet values ('Tema 2 e lendes','linku','2023-02-19 15:20:02',1)
insert into dokumentet values ('Tema 3 e lendes','linku','2023-02-26 15:20:02',1)
insert into dokumentet values ('Tema 4 e lendes','linku','2023-03-02 15:20:02',1)
select * from dokumentet

create table notat(
	ID int primary key identity(1,1),
	lendaID int,
	nxenesiID int,
	stafiID int,
	notaNumer int,
	notaShkronje varchar(5),
	dataVendosjes datetime,
	foreign key (lendaID) references lenda(ID),
	foreign key (nxenesiID) references nxenesi(ID),
	foreign key (stafiID) references stafi(ID)
)

insert into notat values(1,1,2,3,'C','2023-02-05 15:20:02.000')
delete from notat where notat.notaShkronje = 'C'

delete from notat where notat.nxenesiID = 1

select * from dokumentet

select * from stafi



create table blogs(
	ID int primary key identity(1,1),
	titulli varchar(255),
	permbatja varchar(max),
	dataPublikimit date,
	kliket int,
	fotoPath varchar(max),
	aprovuar varchar(5),
	autoriID int
	foreign key (autoriID) references stafi(ID)
)

insert into blogs values ('titulli','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli3','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli4','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli5','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli6','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli7','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli8','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli9','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli10','permbatja','2023-02-06',10,'fotoPath','po',1)
insert into blogs values ('titulli11','permbatja','2023-02-06',10,'fotoPath','po',1)

insert into blogs values ('titulli2','permbatja2','2023-02-06',10,'fotoPath2','jo',1)


create table tags(
	ID int primary key identity(1,1),
	emri varchar(255)
)


create table blogs_tags(
	ID int primary key identity(1,1),
	blogID int,
	tagID int,
	foreign key (blogID) references blogs(ID),
	foreign key (tagID) references tags(ID)
)

insert into blogs_tags values(1,1)
insert into blogs_tags values(1,2)
insert into blogs_tags values(1,3)

select t.emri from  blogs_tags bt
join tags t on bt.tagID = t.ID
join blogs b on b.ID = bt.blogID
where bt.ID = 1


create table komentet(
	ID int primary key identity(1,1),
	komenti varchar(max),
	dataPublikimit date,
	autoriID varchar(25),
	blogID int,
	foreign key (blogID) references blogs(ID)
)
select * from komentet

SELECT k.*, 
    CASE 
 WHEN LEFT(k.autoriID, 1) = 'M' THEN s.emri_mbiemri
 WHEN LEFT(k.autoriID, 1) = 'N' THEN n.emri_mbiemri
 ELSE NULL
 END AS emri_mbiemri
 FROM dbo.komentet k
 LEFT JOIN stafi s ON LEFT(k.autoriID, 1) = 'M' AND s.StafiID = k.autoriID
 LEFT JOIN nxenesi n ON LEFT(k.autoriID, 1) = 'N' AND n.NxenesiID = k.autoriID
 where blogID = 1

 select * from prindi
 select * from nxenesi