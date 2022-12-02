-- Entities

DROP TABLE IF EXISTS Amb2_Order_Items;
DROP TABLE IF EXISTS Amb2_Orders;
DROP TABLE IF EXISTS Amb2_Address;
DROP TABLE IF EXISTS Amb2_User;
DROP TABLE IF EXISTS Amb2_Pizzas_Ingredients;
DROP TABLE IF EXISTS Amb2_Ingredients;
DROP TABLE IF EXISTS Amb2_Pizzas;

CREATE TABLE IF NOT EXISTS Amb2_User (
	id VARCHAR(255) PRIMARY KEY,
	name VARCHAR(255)NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
);

CREATE TABLE IF NOT EXISTS Amb2_Address (
	user_id VARCHAR(255) PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    neighbourhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    complement VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Amb2_User (id)
);

CREATE TABLE IF NOT EXISTS Amb2_Pizzas (
	name VARCHAR(255) PRIMARY KEY,
    price DECIMAL(3,2) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Amb2_Ingredients (
	name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Amb2_Pizzas_Ingredients (
	pizza_name VARCHAR(255) NOT NULL,
    ingredient_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (pizza_name) REFERENCES Amb2_Pizzas (name),
    FOREIGN KEY (ingredient_name) REFERENCES Amb2_Ingredients (name)
);

CREATE TABLE IF NOT EXISTS Amb2_Orders (
	id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Amb2_Order_Items (
	id VARCHAR(255) PRIMARY KEY,
    pizza_name VARCHAR(255) NOT NULL,
    quantity TINYINT,
    order_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (pizza_name) REFERENCES Amb2_Pizzas (name),
    FOREIGN KEY (order_id) REFERENCES Amb2_Orders (id)
);

INSERT INTO Amb2_Pizzas VALUES (
	"Margherita",
    5,
    "https://i.postimg.cc/pXSNmHS0/marguerita.jpg"
);

INSERT INTO Amb2_Pizzas VALUES (
	"Búfala",
    6,
    "https://i.postimg.cc/FHKjBtsQ/pizza-Bufala.jpg"
);

INSERT INTO Amb2_Ingredients VALUES (
	"tomato"
);

INSERT INTO Amb2_Ingredients VALUES (
	"mozzarela"
);

INSERT INTO Amb2_Ingredients VALUES (
	"mozzarela de búfala"
);

INSERT INTO Amb2_Pizzas_Ingredients VALUES (
	"Margherita",
    "tomato"
);

INSERT INTO Amb2_Pizzas_Ingredients VALUES (
	"Margherita",
    "mozzarela"
);

INSERT INTO Amb2_Pizzas_Ingredients VALUES (
	"Búfala",
    "tomato"
);

INSERT INTO Amb2_Pizzas_Ingredients VALUES (
	"Búfala",
    "mozzarela de búfala"
);

INSERT INTO Amb2_User VALUES (
"001",
"Astrodev",
"astrodev@gmail.com",
"123456",
"ADMIN"
);

INSERT INTO Amb2_User VALUES (
"002",
"Fulano",
"fulano@gmail.com",
"123456",
"normal"
);

SELECT * FROM Amb2_Pizzas
JOIN Amb2_Pizzas_Ingredients ON Amb2_Pizzas_Ingredients.pizza_name = Amb2_Pizzas.name
WHERE name = "Margherita";

SELECT * FROM Amb2_Pizzas
JOIN Amb2_Pizzas_Ingredients ON Amb2_Pizzas_Ingredients.pizza_name = Amb2_Pizzas.name
WHERE name = "Bufala";

INSERT INTO Amb2_Orders VALUES (
	"mesa-1"
);

INSERT INTO Amb2_Order_Items VALUES (
	"pedido-1",
    "Margherita",
    2,
    "mesa-1"
);

INSERT INTO Amb2_Order_Items VALUES (
	"pedido-2",
    "Bufala",
    1,
    "mesa-1"
);

SELECT * FROM Amb2_Orders
JOIN Amb2_Order_Items ON Amb2_Order_Items.order_id = Amb2_Orders.id
JOIN Amb2_Pizzas ON Amb2_Order_Items.pizza_name = Amb2_Pizzas.name
WHERE Amb2_Orders.id = "mesa-1";