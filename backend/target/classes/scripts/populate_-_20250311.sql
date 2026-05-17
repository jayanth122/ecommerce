use t2r;

-- Password in plain text = Password123!

INSERT INTO users (created_at, email, first_name, last_name, password, role_id, updated_at, username, phone_number)
VALUES
    ('2025-01-01', 'emily.jones@example.com', 'Emily', 'Jones', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 1, '2025-01-10', 'emilyj', '555-1001'),
    ('2025-01-02', 'daniel.smith@example.com', 'Daniel', 'Smith', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 2, '2025-01-10', 'daniels', '555-1002'),
    ('2025-01-03', 'olivia.brown@example.com', 'Olivia', 'Brown', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 1, '2025-01-10', 'oliviab', '555-1003'),
    ('2025-01-04', 'michael.davis@example.com', 'Michael', 'Davis', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 2, '2025-01-10', 'miked', '555-1004'),
    ('2025-01-05', 'sophia.wilson@example.com', 'Sophia', 'Wilson', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 1, '2025-01-10', 'sophiaw', '555-1005'),
    ('2025-01-06', 'james.taylor@example.com', 'James', 'Taylor', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 2, '2025-01-10', 'jamest', '555-1006'),
    ('2025-01-07', 'isabella.miller@example.com', 'Isabella', 'Miller', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 1, '2025-01-10', 'isabellam', '555-1007'),
    ('2025-01-08', 'alexander.moore@example.com', 'Alexander', 'Moore', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 2, '2025-01-10', 'alexanderm', '555-1008'),
    ('2025-01-09', 'mia.jackson@example.com', 'Mia', 'Jackson', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 1, '2025-01-10', 'miaj', '555-1009'),
    ('2025-01-10', 'logan.anderson@example.com', 'Logan', 'Anderson', '$2b$12$Ee2dnB/gfuWaYggQviQzG.gggqbTW9yRxET8qPIVMZmYlEL2sP/J6', 2, '2025-01-10', 'logana', '555-1010');





INSERT INTO category (category_name) VALUES ('Electronics');
INSERT INTO category (category_name) VALUES ('Fashion');

INSERT INTO sub_category (sub_category_name, sub_category_thumbnail, category_id)
VALUES 
('Mobile Phones', '/images/HomePage/mobilePhones.png', 1),
('Computers', '/images/HomePage/computers.png', 1),
('Electrical Wires & Cables', '/images/HomePage/wiresCables.png', 1),
('Gaming', '/images/HomePage/gaming.png', 1),
('Home Electronics', '/images/HomePage/speakers.png', 1),
('Miscellaneous', '/images/HomePage/miscElectronics.png', 1);


INSERT INTO sub_category (sub_category_name, sub_category_thumbnail, category_id)
VALUES 
('Women\'s', '/images/HomePage/womens.png', 2),
('Men\'s', '/images/HomePage/mens.png', 2),
('Children\'s', '/images/HomePage/children.png', 2),
('Footwear', '/images/HomePage/footwear.png', 2),
('Accessories', '/images/HomePage/accessories.png', 2),
('Miscellaneous', '/images/HomePage/miscClothing.png', 2);

INSERT INTO brand (brand_name)
VALUES
('Genadi'),
('Howard'),
('JMS'),
('Fender'),
('trueCable'),
('Microsoft'),
('Nintendo'),
('Sony'),
('GOH'),
('KKY'),
('Pixar'),
('Rumman'),
('Apple'),
('Dyson'),
('HP'),
('Google'),
('Samsung'),
('Equator'),
('Sofia'),
('Viz'),
('Arrow'),
('Champs'),
('Maison'),
('Mw'),
('Shu'),
('Sts'),
('Styl'),
('EZ'),
('Paris'),
('Bulwark'),
('Parker'),
('Snug'),
('Indie Denim'),
('Luna');
;


-- electronics
INSERT INTO product (product_name, product_description, category_id, sub_category_id, brand_id, list_price, created_at)
VALUES
('Genadi Desktop G200', 'Powerful desktop computer for office and gaming needs.', 1, 2, 1, 899.99, '2025-01-15'),
('Genadi Laptop X15', 'Lightweight laptop with a high-resolution display and long battery life.', 1, 2, 1, 1099.99, '2025-01-15'),
('Howard UltraBook Pro', 'Slim and powerful laptop with advanced cooling and a 4K display.', 1, 2, 2, 1299.99, '2025-01-15'),
('Howard EliteBook 14', 'Durable laptop designed for professionals with enhanced security features.', 1, 2, 2, 1149.99, '2025-01-15'),
('JMS Workstation X7', 'High-performance desktop designed for multitasking and heavy workloads.', 1, 2, 3, 999.99, '2025-01-15'),
('JMS Notebook Pro 15', 'Compact and versatile laptop with extended battery life and fast performance.', 1, 2, 3, 849.99, '2025-01-15'),
('Fender Heavy Duty Power Cable', 'Durable power cable for heavy-duty electronics and appliances.', 1, 3, 4, 19.99, '2025-01-15'),
('trueCable 10ft Ethernet Cable', 'High-speed Ethernet cable for gaming and streaming with reinforced connectors.', 1, 3, 5, 12.99, '2025-01-15'),
('Microsoft Xbox One', 'Next-generation gaming console with 4K support and exclusive titles.', 1, 4, 6, 399.99, '2025-01-15'),
('Nintendo Switch', 'Hybrid gaming console that can be used as a home console or handheld device.', 1, 4, 7, 299.99, '2025-01-15'),
('Sony PlayStation 5', 'Powerful gaming console with ultra-fast load times and stunning graphics.', 1, 4, 8, 499.99, '2025-01-15');

-- fashion
INSERT INTO product (product_name, product_description, category_id, sub_category_id, brand_id, list_price, created_at)
VALUES
('Arrow Boys Hawaiian Shirt', 'Bright and colorful button-up Hawaiian shirt for boys, perfect for summer outings.', 2, 9, 21, 24.99, '2025-01-15'),
('Arrow Girls Pink Dress', 'Elegant pink dress for girls, perfect for special occasions.', 2, 9, 21, 34.99, '2025-01-15'),
('Arrow Girls White Polka Dot Dress', 'Charming white dress with green polka dots, designed for comfort and style.', 2, 9, 21, 29.99, '2025-01-15'),
('Champs Boys Red Flannel Pajamas', 'Cozy red pajamas with a classic flannel pattern, perfect for chilly nights.', 2, 9, 22, 19.99, '2025-01-15'),
('Champs Boys Green Flannel Pajamas', 'Comfortable green pajamas with a stylish flannel pattern, ideal for bedtime.', 2, 9, 22, 19.99, '2025-01-15'),
('Champs Boys Patterned Pajamas', 'Soft pajamas with random shapes and symbols, designed for fun and relaxation.', 2, 9, 22, 21.99, '2025-01-15'),
('Indie Denim Dark Wash Relaxed Fit Jeans', 'Stylish dark wash jeans with a relaxed fit, perfect for casual outings.', 2, 7, 33, 49.99, '2025-01-15'),
('Indie Denim Light Wash Jogger Jeans', 'Trendy light wash jeans with jogger-style cuffs for a modern look.', 2, 7, 33, 54.99, '2025-01-15'),
('Indie Denim Black Loose Fit Jeans', 'Comfortable black jeans with a loose fit, ideal for everyday wear.', 2, 7, 33, 59.99, '2025-01-15'),
('Luna Green Floral Dress', 'Elegant green dress with a vibrant floral pattern, perfect for casual and semi-formal occasions.', 2, 7, 34, 74.99, '2025-01-15'),
('Luna Floral Blouse', 'Chic floral blouse-style, combining comfort and style for daily wear.', 2, 7, 34, 64.99, '2025-01-15'),
('Luna Blue Polka Dot Dress', 'Classic blue dress with white polka dots, ideal for vintage-inspired looks.', 2, 7, 34, 69.99, '2025-01-15');

INSERT INTO image (image_url, product_id) 
VALUES 
('/images/Electronics/Computers/Genadi/Genadi_Desktop1.png', 1),
('/images/Electronics/Computers/Genadi/Genadi_Laptop1.jpg', 2),
('/images/Electronics/Computers/Howard/Howard-Laptop_2.jpg', 3),
('/images/Electronics/Computers/Howard/Howard-Laptop1.jpg', 4),
('/images/Electronics/Computers/JMS/JMS-Desktop1.jpg', 5),
('/images/Electronics/Computers/JMS/JMS-Laptop1.jpg', 6),
('/images/Electronics/Electrical_Wires_&_Cables/Fender/wires_and_cables.png', 7),
('/images/Electronics/Electrical_Wires_&_Cables/trueCable/ethernet_cable.png', 8),
('/images/Electronics/Gaming/Microsoft/Microsoft_Gaming_1.avif', 9),
('/images/Electronics/Gaming/Nintendo/Nintendo_Gaming_1.avif', 10),
('/images/Electronics/Gaming/Sony/Sony_Gaming_1.avif', 11),
('/images/Fashion/Children\'s/Arrow/arrow_children_1.jpg', 12),
('/images/Fashion/Children\'s/Arrow/arrow_children_2.png', 13),
('/images/Fashion/Children\'s/Arrow/arrow_children_3.jpg', 14),
('/images/Fashion/Children\'s/Champs/champs_children_1.jpg', 15),
('/images/Fashion/Children\'s/Champs/champs_children_3.jpg', 16),
('/images/Fashion/Children\'s/Champs/champs_children_2.jpg', 17),
('/images/Fashion/Women\'s/Indie_Denim/IndiDenim_women_1.jpg', 18),
('/images/Fashion/Women\'s/Indie_Denim/IndiDenim_women_2.jpg', 19),
('/images/Fashion/Women\'s/Indie_Denim/IndiDenim_women_3.jpg', 20),
('/images/Fashion/Women\'s/Luna/luna_women_1.jpg', 21),
('/images/Fashion/Women\'s/Luna/luna_women_2.jpeg', 22),
('/images/Fashion/Women\'s/Luna/luna_women_3.jpeg', 23);

INSERT INTO review (created_at, description, rating, title, product_id, user_id) VALUES
('2025-01-15', 'This product is absolutely fantastic! The build quality is great, and it feels very durable. Highly recommended for anyone looking for reliability.', 5, 'Excellent Build Quality', 1, 1),
('2025-01-16', 'The product is good but not great. It works fine, but I expected more features at this price point.', 3, 'Decent Purchase', 1, 2),
('2025-01-17', 'I was pleasantly surprised by the comfort and ease of use. This product has become a daily essential.', 5, 'Exceeded Expectations', 2, 3),
('2025-01-18', 'Affordable and stylish, but the material quality could be better.', 4, 'Stylish yet Affordable', 2, 4),
('2025-01-19', 'Good product, but I faced some minor issues. Customer service was helpful, though.', 3, 'Good with Minor Issues', 2, 5),
('2025-01-20', 'An amazing product with all the features I need. The design is sleek and modern.', 5, 'Fantastic Product', 3, 6),
('2025-01-21', 'This product works well for my needs. It’s not perfect, but it’s worth the price.', 4, 'Worth It!', 3, 7),
('2025-01-22', 'I love the design and functionality of this product. It’s well worth the money.', 5, 'Highly Functional', 5, 8),
('2025-01-23', 'The product quality is top-notch. It has been a delight to use.', 5, 'Amazing Quality', 6, 9),
('2025-01-23', 'The product works as advertised and is quite easy to set up and use.', 4, 'User-Friendly', 7, 10),
('2025-01-24', 'Good value for money. I would definitely recommend it to others.', 5, 'Great Value', 7, 1),
('2025-01-24', 'I like this product for its simplicity and ease of use. It’s perfect for beginners.', 4, 'Simple and Effective', 8, 2),
('2025-01-24', 'The features are basic, but it gets the job done without any issues.', 3, 'Basic but Functional', 8, 3),
('2025-01-25', 'The quality and performance of this product are outstanding. I am extremely satisfied.', 5, 'Outstanding Quality', 9, 4),
('2025-01-25', 'This product is okay for the price, but there are better alternatives available.', 3, 'Average Experience', 11, 5),
('2025-01-25', 'The design and functionality of this product are great. It’s worth every penny.', 5, 'Great Buy!', 12, 6),
('2025-01-25', 'The performance is decent, but the design could be improved for better usability.', 3, 'Decent but Not Great', 12, 7),
('2025-01-25', 'This product met all my expectations and then some. I highly recommend it.', 5, 'Highly Satisfied', 13, 8),
('2025-01-26', 'The product is well-designed and easy to use. It’s a great addition to my daily routine.', 4, 'Great for Daily Use', 15, 9),
('2025-01-26', 'An excellent product that combines style and functionality. I love using it.', 5, 'Stylish and Functional', 16, 10),
('2025-01-26', 'Good product overall, but the packaging could be improved.', 3, 'Good, but Room for Improvement', 17, 1),
('2025-01-26', 'This product is just perfect for my needs. It has all the features I was looking for.', 5, 'Perfect Choice', 19, 2),
('2025-01-27', 'The product is average at best. It works, but I wouldn’t recommend it.', 2, 'Not Great', 20, 3),
('2025-01-27', 'An outstanding product that delivers great value for money. I am thoroughly impressed.', 5, 'Amazing Value', 21, 4),
('2025-01-28', 'Amazing! I love everything about this product. It exceeded my expectations in terms of performance and durability.', 5, 'Exceeded Expectations', 1, 6),
('2025-01-28', 'This is a fantastic value for money. The product works as expected and even better than I thought it would.', 5, 'Great Value', 5, 7),
('2025-01-28', 'It’s good, but there are a few things that could be improved. I think the user manual could be more detailed.', 3, 'Good, but Room for Improvement', 7, 8),
('2025-01-29', 'I am very satisfied with this purchase. The product works great, and it’s very user-friendly. Would buy again.', 5, 'Highly Satisfied', 8, 9);


INSERT INTO stock (size, quantity, product_id) VALUES
-- Genadi Desktop G200 (Desktop, no sizes)
(NULL, 1, 1),

-- Genadi Laptop X15 (Laptop, no sizes)
(NULL, 0, 2),

-- Howard UltraBook Pro (Laptop, no sizes)
(NULL, 50, 3),

-- Howard EliteBook 14 (Laptop, no sizes)
(NULL, 60, 4),

-- JMS Workstation X7 (Desktop, no sizes)
(NULL, 70, 5),

-- JMS Notebook Pro 15 (Laptop, no sizes)
(NULL, 90, 6),

-- Fender Heavy Duty Power Cable (Accessory, no sizes)
(NULL, 200, 7),

-- trueCable 10ft Ethernet Cable (Accessory, no sizes)
(NULL, 250, 8),

-- Microsoft Xbox One (Gaming Console, no sizes)
(NULL, 150, 9),

-- Nintendo Switch (Gaming Console, no sizes)
(NULL, 180, 10),

-- Sony PlayStation 5 (Gaming Console, no sizes)
(NULL, 120, 11),

-- Arrow Boys Hawaiian Shirt (Clothing, sizes available)
('S', 9, 12),
('M', 0, 12),
('L', 20, 12),

-- Arrow Girls Pink Dress (Clothing, sizes available)
('S', 40, 13),
('M', 35, 13),
('L', 25, 13),

-- Arrow Girls White Polka Dot Dress (Clothing, sizes available)
('S', 50, 14),
('M', 45, 14),
('L', 30, 14),

-- Champs Boys Red Flannel Pajamas (Clothing, sizes available)
('S', 60, 15),
('M', 50, 15),
('L', 40, 15),

-- Champs Boys Green Flannel Pajamas (Clothing, sizes available)
('S', 55, 16),
('M', 45, 16),
('L', 35, 16),

-- Champs Boys Patterned Pajamas (Clothing, sizes available)
('S', 65, 17),
('M', 55, 17),
('L', 45, 17),

-- Indie Denim Dark Wash Relaxed Fit Jeans (Clothing, sizes available)
('28', 20, 18),
('30', 30, 18),
('32', 25, 18),

-- Indie Denim Light Wash Jogger Jeans (Clothing, sizes available)
('28', 25, 19),
('30', 35, 19),
('32', 30, 19),

-- Indie Denim Black Loose Fit Jeans (Clothing, sizes available)
('28', 15, 20),
('30', 20, 20),
('32', 25, 20),

-- Luna Green Floral Dress (Clothing, sizes available)
('S', 50, 21),
('M', 40, 21),
('L', 30, 21),

-- Luna Floral Blouse (Clothing, sizes available)
('S', 60, 22),
('M', 50, 22),
('L', 40, 22),

-- Luna Blue Polka Dot Dress (Clothing, sizes available)
('S', 45, 23),
('M', 35, 23),
('L', 25, 23);

INSERT INTO orders (order_id, customer_id, order_status, order_date, shipped_date, shipped_address, store_id, user_id) 
VALUES
(1, 1, 'DELIVERED', '2025-01-15', '2025-01-17', '123 Main Street, New York, NY 10001', 1, 1),
(2, 2, 'PENDING', '2025-01-15', NULL, '456 Oak Avenue, Los Angeles, CA 90001', 1, 2),
(3, 1, 'DELIVERED', '2025-01-16', '2025-01-18', '789 Pine Road, Chicago, IL 60601', 2, 1),
(4, 3, 'SHIPPED', '2025-01-16', '2025-01-19', '321 Elm Drive, Houston, TX 77001', 1, 3),
(5, 2, 'DELIVERED', '2025-01-17', '2025-01-19', '654 Maple Lane, Phoenix, AZ 85001', 2, 2),
(6, 1, 'PENDING', '2025-01-17', NULL, '987 Cedar Court, Philadelphia, PA 19101', 1, 1),
(7, 3, 'DELIVERED', '2025-01-18', '2025-01-20', '147 Birch Street, San Antonio, TX 78201', 2, 3),
(8, 2, 'SHIPPED', '2025-01-18', '2025-01-21', '258 Willow Way, San Diego, CA 92101', 1, 2),
(9, 1, 'DELIVERED', '2025-01-19', '2025-01-21', '369 Ash Avenue, Dallas, TX 75201', 2, 1),
(10, 3, 'PENDING', '2025-01-19', NULL, '741 Spruce Street, San Jose, CA 95101', 1, 3),
(11, 2, 'DELIVERED', '2025-01-20', '2025-01-22', '852 Palm Drive, Jacksonville, FL 32201', 2, 2),
(12, 1, 'SHIPPED', '2025-01-20', '2025-01-23', '963 Beach Road, Columbus, OH 43201', 1, 1);

INSERT INTO order_item (id, order_id, price, product_id, quantity)
VALUES
(7, 7, 29.99, 2, 3),
(8, 8, 39.99, 3, 5),
(9, 9, 49.99, 4, 2),
(1, 1, 29.99, 17, 3),
(2, 2, 39.99, 12, 5),
(3, 3, 49.99, 13, 2);