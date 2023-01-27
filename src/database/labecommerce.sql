-- Active: 1673892381949@@127.0.0.1@3306

CREATE TABLE users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT  DEFAULT (DATETIME()) NOT NULL
    );
    

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
   
);

DROP TABLE users;

DROP TABLE products;


PRAGMA table_info ('users');

PRAGMA table_info ( 'products');



INSERT INTO users (id, name, email, password)
VALUES 
('a001','Mickey','mickey@labenu.com','111111'), 
('a002','Minnie', 'minnie@lab.com.br','222222'), 
('a003','Pluto','fran@casa.com.br','333333');

INSERT INTO products (id, name, price, description, image_url)
VALUES
('p001', 'Boneca', 50, 'Brinquedos','http://lorempixel.com.br/500/400/?1' ),
('p002', 'Óculos', 100, 'Acessories', 'http://lorempixel.com.br/500/400/?1'),
('p003', 'Sandalia', 80, 'Calçado', 'http://lorempixel.com.br/500/400/?1'),
('p004', 'carrinho', 70, 'Brinquedos', 'http://lorempixel.com.br/500/400/?1'),
('p005', 'Boné', 90, 'Acessórios', 'http://lorempixel.com.br/500/400/?1' );



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
ORDER BY price ASC;

--relaçoes sql I

--criar a tabela de pedidos (purchases)

--colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL, único e obrigatório)
-- paid (INTEGER e obrigatório)
-- delivered_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    create_at TEXT  DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY(buyer_id) REFERENCES users (id)
);

PRAGMA table_info('purchases');

DROP TABLE purchases;

--A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true.
--Os pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.

INSERT INTO purchases (id, buyer_id, total_price )
VALUES
('c0001', 'a001', 600),
('c0002','a001', 300),
('c0003','a002',200),
('c0004','a002',100),
('c0005','a003', 250),
('c0006','a003', 400);

SELECT * FROM purchases;

DROP TABLE purchases;


UPDATE purchases --aqui insere data em todos os pedidos, se eu quisesse em algum especifico colocaria o where com id
SET delivered_at = DATE ('now');


SELECT * FROM purchases
INNER JOIN users
on purchases.buyer_id = users.id
WHERE users.id = "a001";

--EXERCÍCIOS RELAÇÕES-SQL ii

--Exercício 1.1 Criação da tabela de relações

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products (id)

);

DROP TABLE purchases_products;
--exercício 2.1 Popule sua tabela purchases_products simulando 3 compras de clientes.

INSERT INTO purchases_products (  purchase_id,product_id,quantity)
VALUES
('c0001','p001',12),
('c0002','p002',3),
('c0003','p002',2);


--exercício 2.2 Consulta com junção INNER JOIN
--Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

SELECT
products.name,
purchases_products.purchase_id AS idCompra,
purchases_products.product_id AS idProduto,
purchases_products.quantity AS quantidade

FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


SELECT * FROM products;
