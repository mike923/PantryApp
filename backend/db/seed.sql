DROP DATABASE IF EXISTS pantry;

CREATE DATABASE pantry;

\c pantry

CREATE TABLE users (
    id  SERIAL PRIMARY KEY ,
    email VARCHAR NOT NULL,
    password_digest VARCHAR NOT NULL
);

CREATE TABLE receipts (
    id  SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    receipt_img_url VARCHAR NOT NULL,
    receipt_json JSON,
    store_name VARCHAR NOT NULL,
    store_coordinate JSON NOT NULL
);

CREATE TABLE pantry (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id)
);

CREATE TABLE food_item(
    id SERIAL PRIMARY KEY,
    receipt_id INT REFERENCES receipts(id),
    pantry_id INT REFERENCES pantry(id),
    name VARCHAR NOT NULL,
    price INT NOT NULL
); 

CREATE TABLE nutrition (
    id SERIAL PRIMARY KEY,
    food_id INT REFERENCES food_item(id),
    calories INT NOT NULL
);

INSERT INTO users (email,password_digest) 
VALUES 
('michaelscott@pursuit.org','$2b$12$OJ2Kc75eXgLddy2.iFqxcuCMlN1.i25Jze6JDUR7Pjv4.ZdWDR.cm'),--1
('pambeesly@pursuit.org','$2b$12$tfAxX4n9f2jJ65Sy3lS41OoK07pR18782Vz.3VmI9gpTN0L7QNCXa');--2

INSERT INTO receipts (user_id,receipt_img_url,receipt_json,store_name,store_coordinate) 
VALUES
(1,'https://farm6.staticflickr.com/5530/14653691031_5c3d80b968.jpg','{"DRP DT":3,"Dr pepper":3,"Dr pepper": 3 ,"Dr pepper": 3,"Dr pepper": 3}','Walmart','{"latitude":41.8287,"longitude":88.0569}')