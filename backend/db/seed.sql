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
('michaelscott@pursuit.org','michael'),--1
('pambeesly@pursuit.org','pam');--2

INSERT INTO receipts (user_id,receipt_img_url,receipt_json,store_name,store_coordinate) 
VALUES
(1,'https://farm6.staticflickr.com/5530/14653691031_5c3d80b968.jpg','{"DRP DT":3,"Dr pepper":3,"Dr pepper": 3 ,"Dr pepper": 3,"Dr pepper": 3}','Walmart','{"latitude":41.8287,"longitude":88.0569}');

INSERT INTO receipts (user_id,receipt_img_url,receipt_json,store_name,store_coordinate) 
VALUES
(2,'https://unionadvocate.files.wordpress.com/2013/04/metsa-receipt-web.jpg',
'{"HNT SPAGETTI SAUCE" : 0.88,"EE SPAGETTI SAUCE": 0.88,"Dr MRCHN INST LUNCH": 2.39 
,"EE  COFFEE FRNCH TOAST": 3.t4,"ESTL EVRDY PNT BTR": 4.35, "CUB WHITE BREAD": 1.19,
"SHPERS VALU SALAMI": 1.19, "ICE BERG LETTUCE": 1.48, "BANANAS YELLOW": 1.04, "POTATO RUSSET": 1.05,
"OLD O PINK LMNADE": 1.59, "CUB HOMOGENIZED MILK": 2.99, "ESENTL EDAY CHEESE": 2.99, "CUB LARGE EGGS": 1.98 
}','CUBS',
'{"latitude":44.9527661,,"longitude":-93.1627024,}');


INSERT INTO pantry(user_id)
VALUES
(1);

INSERT INTO food_item (receipt_id,pantry_id,name,price)
 VALUES
(1,1,'DRP DT',3),
(1,1,'Dr pepper',3),
(1,1,'Dr pepper',3),
(1,1,'Dr pepper',3),
(1,1,'Dr pepper',3);


 INSERT INTO nutrition(food_id,calories)
VALUES
(1,350);