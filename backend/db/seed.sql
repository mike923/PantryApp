DROP DATABASE IF EXISTS pantry;

CREATE DATABASE pantry;

\c pantry

CREATE TABLE users (
    id  SERIAL PRIMARY KEY ,
    email VARCHAR NOT NULL,
    password_digest VARCHAR NOT NULL
);

INSERT INTO users (email,password_digest) 
VALUES 
('michaelscott@pursuit.org','$2b$12$OJ2Kc75eXgLddy2.iFqxcuCMlN1.i25Jze6JDUR7Pjv4.ZdWDR.cm'),
('pambeesly@pursuit.org','$2b$12$tfAxX4n9f2jJ65Sy3lS41OoK07pR18782Vz.3VmI9gpTN0L7QNCXa');