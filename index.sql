DROP DATABASE visitor;
show DATABASES;


USE sesac;

CREATE TABLE visitor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10),
    comment MEDIUMTEXT NOT NULL);

    desc visitor;

INSERT INTO visitor (name, comment) 
VALUES 
( '홍길동' , '내가 왔다.'),

INSERT INTO visitor VALUES (null,'이찬혁','으라차차');
INSERT INTO visitor VALUES (null,'삭제예정','으라차차');

SELECT * FROM visitor;

-- data 수정

UPDATE visitor SET comment='야호~~!' WHERE id=2;

DELETE FROM visitor WHERE id=3;

-- MYSQL 사용자 생성
CREATE USER 'sesac'@'%' IDENTIFIED BY '1234';

--권한 부여
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

SELECT * FROM mysql.user;

SHOW GRANTS for 'sesac'@'%';

SELECT Host, User, plugin FROM mysql.user;

show tables;

SELECT * FROM visitor;