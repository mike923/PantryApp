-- DROP DATABASE IF EXISTS pantry;

-- CREATE DATABASE pantry;

-- \c pantry

CREATE TABLE pantry (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);


CREATE TABLE users (
    id  SERIAL PRIMARY KEY ,
    email VARCHAR NOT NULL,
    pantry_id INT REFERENCES pantry (id),
    password_digest VARCHAR NOT NULL
);

CREATE TABLE receipts (
    id  SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    receipt_img_url VARCHAR NOT NULL,
    receipt_json JSON,
    store_name VARCHAR NOT NULL,
    store_coordinate JSON NOT NULL,
    spent INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_categories (
    id SERIAL PRIMARY key,
    type VARCHAR NOT NULL
);

CREATE TABLE all_foods(
    id SERIAL PRIMARY KEY,
    upc VARCHAR NOT NULL,
    type_id INT REFERENCES item_categories(id)
); 

CREATE TABLE food_item(
    id SERIAL PRIMARY KEY,
    receipt_id INT REFERENCES receipts(id),
    pantry_id INT REFERENCES pantry(id),
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    food_id INT REFERENCES all_foods(id),
    expired BOOLEAN DEFAULT FALSE

); 

CREATE TABLE shopping_list (
    id SERIAL PRIMARY KEY,
    upc INT
);



INSERT INTO pantry(name)
VALUES
('the office'),
('jimXpam');


-- inserting test users into users table
INSERT INTO users (email,password_digest) 
VALUES 
('michaelscott@pursuit.org','michael'),--1
('pambeesly@pursuit.org','pam');--2

-- inserting into the receipts table for test user 1
INSERT INTO receipts (user_id,receipt_img_url,receipt_json,store_name,store_coordinate,spent) 
VALUES
(1,'https://farm6.staticflickr.com/5530/14653691031_5c3d80b968.jpg',
'{"DRP DT":3,"Dr pepper":3,"Dr pepper": 3 ,"Dr pepper": 3,"Dr pepper": 3}','Walmart',
'{"latitude":41.8287,"longitude":88.0569}',
15
);

-- inserting into the receipts table for test user 2
INSERT INTO receipts (user_id,receipt_img_url,receipt_json,store_name,store_coordinate,spent) 
VALUES
(2,'https://unionadvocate.files.wordpress.com/2013/04/metsa-receipt-web.jpg',
'{"HNT SPAGETTI SAUCE": 0.88,"EE SPAGETTI SAUCE": 0.88,"Dr MRCHN INST LUNCH": 2.39 
,"EE COFFEE FRNCH TOAST": 3.74,"ESTL EVRDY PNT BTR": 4.35, "CUB WHITE BREAD": 1.19,
"SHPERS VALU SALAMI": 1.19, "ICE BERG LETTUCE": 1.48, "BANANAS YELLOW": 1.04, "POTATO RUSSET": 1.05,
"OLD O PINK LMNADE": 1.59, "CUB HOMOGENIZED MILK": 2.99, "ESENTL EDAY CHEESE": 2.99, "CUB LARGE EGGS": 1.98 
}','CUBS',
'{"latitude":44.9527661,"longitude":-93.1627024}',
26.84
);

-- inserting into categories table
INSERT INTO item_categories(type)
VALUES
('Grocery'),
('Meat'),
('Produce'),
('Frozen'),
('Dairy');

-- inserting into the all_foods table
INSERT INTO all_foods (upc,type_id)
VALUES
('DRP DT',1),
('Dr pepper',4),
('HNT SPAGETTI SAUCE',1),
('EE SPAGETTI SAUCE',1),
('Dr MRCHN INST LUNCH',1),
('EE COFFEE FRNCH TOAST',1),
('CUB WHITE BREAD',1),
('SHPERS VALU SALAMI',3),
('ICE BERG LETTUCE',3),
('BANANAS YELLOW',3),
('POTATO RUSSET',3),
('ESTL EVRDY PNT BTR',1),
('OLD O PINK LMNADE',4),
('CUB HOMOGENIZED MILK',5),
('ESENTL EDAY CHEESE',5),
('CUB LARGE EGGS',5);

-- inserting data into the food items table
INSERT INTO food_item (receipt_id,pantry_id,name,price,quantity)
 VALUES
(1,1,'DRP DT',3,1),
(1,1,'Dr pepper',3,4);

-- inserting data into the food items table
INSERT INTO food_item (receipt_id,pantry_id,name,price,quantity)
 VALUES
(2,2,'HNT SPAGETTI SAUCE',0.88,1),
(2,2,'EE SPAGETTI SAUCE',0.88,1),
(2,2,'Dr MRCHN INST LUNCH',2.39,1),
(2,2,'EE COFFEE FRNCH TOAST',3.74,1),
(2,2,'CUB WHITE BREAD',1.19,1),
(2,2,'SHPERS VALU SALAMI',1.19,1),
(2,2,'ICE BERG LETTUCE',1.19,1),
(2,2,'BANANAS YELLOW',1.04,1),
(2,2,'POTATO RUSSET',1.05,1),
(2,2,'ESTL EVRDY PNT BTR',4.35,1),
(2,2,'OLD O PINK LMNADE',1.59,1),
(2,2,'CUB HOMOGENIZED MILK',2.99,1),
(2,2,'ESENTL EDAY CHEESE',2.99,1),
(2,2,'CUB LARGE EGGS',1.98,1);
