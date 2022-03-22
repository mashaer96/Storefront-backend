# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:  '/products' [GET]
- Show:   'products/:id' [GET] (args: product id)
- Create: '/products' [POST] [token required]

#### Users
- Index:  '/users' [GET] [token required]
- Show:   '/users/:id' [GET] (args: user id) [token required]
- Create: '/users' [POST] [token required]

#### Orders
- Current Order by user: '/orders/:user_id' [GET] (args: user id) [token required]

## Data Shapes
#### Product
-  id
- name
- price

Table: products (id:number, name:varchar, price:double)

#### User
- id
- firstName
- lastName
- password

Table: users (id:number, first_name:varchar, last_name:varchar, password:varchar)

#### Orders
- id
- user_id
- status of order (active or complete)

Table: orders (id:number, user_id:number[foreign key to users table], status:varchar)

#### Order_items
- order_id
- id of each product in the order
- quantity of each product in the order

Join Table: order_items (order_id:number[foreign key to orders table], product_id:number[foreign key to products table], quantity:number)

