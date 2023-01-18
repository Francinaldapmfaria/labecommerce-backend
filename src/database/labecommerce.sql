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

--QUERY AULA APROFUNDAMENTO SQL

-- Get All Users
-- retorna todos os usuários cadastrados exercícios 1.1/1.2
SELECT * FROM users;
SELECT * FROM products;

-- Search Product by name exercícios 1.3
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca

SELECT * FROM products
WHERE name = 'carrinho';

-- Create User EXERCÍCIO 1.4
-- mocke um novo usuário
-- insere o item mockado na tabela users

INSERT INTO users (id, email, password)
VALUES
('A005', 'florzinha@hot.com', '252623');

-- Create Product exercício 1.5
-- mocke um novo produto
-- insere o item mockado na tabela products

INSERT INTO products (id, name, price, category)
VALUES
('1700', 'espada', 30, 'toy');

--//////////////////////////////////////////////////////////////

-- Get Products by id exercício 2.1
-- mocke uma id
-- busca baseada no valor mockado

SELECT * FROM products 
WHERE id = '1200';

-- Delete User by id EXERCÍCIO 2.2
-- mocke uma id
-- delete a linha baseada no valor mockado

 DELETE FROM users
 WHERE id = 'a003';

--  Delete Product by id EXERCÍCIO 2.3
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM products
 WHERE id = '1200';

--  Edit User by id EXERCÍCIO 2.4
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados

UPDATE users SET email = 'patodonald@disney'
WHERE id='A004';

-- Edit Product by id EXERCÍCIO 2.5
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados

UPDATE products SET name = 'bonequinha'
WHERE id='1212';

--//////////////////////////////////////////////////////////////////////////////////
-- Get All Users EXERCÍCIOS 3.1
-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1 EXERCICIO 3.2
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products
ORDER BY price ASC
 LIMIT 20 OFFSET 0;

-- Get All Products versão 2 EXERCICIO 3.3
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente

SELECT * FROM products
WHERE price >=50 AND price <= 90
ORDER BY price ASC

