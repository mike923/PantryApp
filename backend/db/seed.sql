DROP DATABASE IF EXISTS pantry;

CREATE DATABASE pantry;

\c pantry

CREATE TABLE pantry (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id  VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  pantry_id INT REFERENCES pantry (id),
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- receipts need status
CREATE TABLE receipts (
  id SERIAL PRIMARY KEY,
  pantry_id INT REFERENCES pantry(id),
  receipt_url VARCHAR,
  store_name VARCHAR,
  total DECIMAL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  receipt_date VARCHAR
);

-- CREATE TABLE item_categories (
--     id SERIAL PRIMARY key,
--     type VARCHAR NOT NULL
-- );

-- CREATE TABLE all_foods (
--     id SERIAL PRIMARY KEY,
--     upc VARCHAR,
--     type_id INT REFERENCES item_categories(id)
-- ); 

CREATE TABLE food_item (
  item_id SERIAL PRIMARY KEY,
  receipt_id INT REFERENCES receipts(id),
  pantry_id INT REFERENCES pantry(id),
  preferred_name VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  quantity INT NOT NULL,
  upc VARCHAR,
  img_url VARCHAR, 
  finished BOOLEAN DEFAULT FALSE,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  purchased_date VARCHAR DEFAULT CURRENT_TIMESTAMP,
  perished_date VARCHAR DEFAULT NULL
);  

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  product VARCHAR NOT NULL UNIQUE,
  pantry_id INT REFERENCES pantry(id),
  quantity INT DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  edited BOOLEAN NOT NULL,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------------------------------------
-- What are deez 🥜?!!?!?!?!?!?!?!!???!?!?!?!?!??!????!???!?!?!?!?!!?!!!!?!??!?!?!?!?!
------------------------------------------------------------------------------------------

INSERT INTO pantry(name) VALUES
  ('Voniel''s Pantry')
;

INSERT INTO users (id, email, pantry_id) VALUES 
  ('PJrztv4Y0BMsHcbEd9bmn2fjzxD2', 'voniel@bvoniel.com', 1)
;

INSERT INTO receipts (pantry_id, receipt_url, store_name, total, receipt_date) VALUES
  (
    1,
    'https://firebasestorage.googleapis.com/v0/b/capstone-pantry.appspot.com/o/Test?alt=media&token=d87cb480-34ee-4e5f-9712-e7bd76bd57a6',
    'Target',
    35.67,
    'Sun 03/03/2020'
  )
;

INSERT INTO food_item (receipt_id, pantry_id, preferred_name, price, quantity, upc, img_url) VALUES
  (1, 1, 'Oreos', 3.99, 2, '044000033279',
    'https://target.scene7.com/is/image/Target/GUEST_03ac5a5f-b70f-4258-8861-6392e93ccc0e?wid=253&hei=253&qlt=80&fmt=pjpeg'
  ),
  (1, 1, 'Oat-Ly Oat Milk', 2.99, 3, '190646630089',
    'https://target.scene7.com/is/image/Target/GUEST_1dc729a4-8089-4f44-8a96-d4248265a135?fmt=pjpeg&wid=1400&qlt=80'
  ),
  (1, 1, 'Rice Krispies', .99, 10, '038000231537',
    'https://target.scene7.com/is/image/Target/GUEST_ff24a031-c9da-40e5-aa59-fad75558e077?wid=253&hei=253&qlt=80&fmt=pjpeg'
  ),
  (1, 1, 'Skippy Peanut Butter', 1.49, 4, '037600105064',
    'https://target.scene7.com/is/image/Target/GUEST_dd642c00-2978-4869-a200-c7873d7744fb?wid=253&hei=253&qlt=80&fmt=pjpeg'
  );


INSERT INTO shopping_list_items(product,pantry_id,edited) VALUES
('Quaker Oats',1,'false');


CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.time_modified = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pantry_modtime BEFORE UPDATE ON pantry FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_shopping_list_modtime BEFORE UPDATE ON shopping_list_items FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
CREATE TRIGGER update_food_item_modtime BEFORE UPDATE ON food_item FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
