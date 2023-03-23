## Description

An ecommerce website built using NextJS and PostgreSQL that allows user to add items to cart, uses dynamic routes for each item, and allows them to sign-in for a wishlist and to persist the items in their cart. This is using nextauth.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



### Messing with SQL
create table tempItems (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	price FLOAT,
	description VARCHAR(255),
	category VARCHAR(255),
	image VARCHAR (255),
	rating FLOAT,
	count FLOAT,
	important_id int,
	CONSTRAINT fk_user
		FOREIGN KEY(important_id)
			REFERENCES "users"(id)
)
