CREATE TABLE items (
  items_uid UUID NOT NULL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  item_description VARCHAR(500),
  rating INT,
  price float,
  created_at timestamp 
);

create table users (
  users_uid UUID NOT NULL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(250) UNIQUE NOT NULL,
  cart_id UUID UNIQUE,
  purchased_orders TEXT [], /* Once a cart gets purchased. Add that id to this array, so we can see order history. */
  created_at timestamp
);

CREATE TABLE cart ( /* When a purchase is complete, we assign a new cart to the user. We can store the old cart id's in the users table to be able to reference old orders. */
  cart_uid UUID NOT NULL PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES users (users_uid),
  discount integer,
  state_tax integer,
  local_tax integer,
  created_at timestamp,
  order_processed_at timestamp
);

CREATE TABLE cartitems (
  cartitems_uid UUID NOT NULL PRIMARY KEY,
  cart_id UUID NOT NULL REFERENCES cart (cart_uid),
  item_id UUID NOT NULL REFERENCES items (items_uid),
  quantity integer NOT NULL, /* Number of this item */
  final_total_purchase_cost float /* Total cost of the item after tax and everything else. Can reference this for previous purchases if prices change, this amount stays the same. */
);


-- INSERT INTO cart(user_id,created_at) VALUES (1, NOW());


-- SELECT * FROM cartitems WHERE cart_id = 1;


-- SELECT * FROM cart JOIN cartitems ON cart.id = cartitems.cart_id;

-- SELECT person.first_name, car.make, car.model, car.price FROM person JOIN car ON person.car_id = car.id;

