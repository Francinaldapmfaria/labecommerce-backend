-- Active: 1673892381949@@127.0.0.1@3306

CREATE TABLE users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


PRAGMA table_info ('users');

PRAGMA table_info ( 'products');



SELECT * FROM users;
SELECT * FROM products;


INSERT INTO users (id, email, password)
VALUES 
('a001','mickey@labenu.com','111111'), 
('a002','minnie@lab.com.br','222222'), 
('a003','fran@casa.com.br','333333');

INSERT INTO products (id, name, price, category)
VALUES
('1212', 'boneca', 50, 'toy' ),
('1200', 'oculos', 100, 'acessories'),
('1400', 'sandalia', 80, 'shoes' ),
('1500', 'carrinho', 70, 'toy' ),
('1600', 'bone', 90, 'acessories' );