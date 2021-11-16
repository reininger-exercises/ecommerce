/*
Create tables for ecommerce database.
*/

CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(254) UNIQUE,
    first_name VARCHAR(20),
    last_name vARCHAR(20),
    current_cart INTEGER REFERENCES carts(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(500),
    price DECIMAL
);

CREATE TABLE IF NOT EXISTS carts_products (
    cart_id INTEGER REFERENCES carts(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER CHECK (quantity > 0)
);

CREATE TABLE IF NOT EXISTS orders (
    user_id integer REFERENCES users(id),
    cart_id integer REFERENCES carts(id),
    time DATE,
    PRIMARY KEY (user_id, cart_id)
);
