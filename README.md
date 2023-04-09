## Description

An ecommerce website built using NextJS and PostgreSQL that allows user to add items to cart, uses dynamic routes for each item, and allows them to sign-in for a wishlist and to persist the items in their cart. This is using nextauth.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Colors
https://colorhunt.co/palette/0b244719376d576cbca5d7e8

## Run add items to cart script
1. Add "type": "module" in package.json
2. run the command using  `npm run script`
3. Remote "type": "module" in package.json

## Potential errors
A space at the end of your path causes it to no longer work

## Image Cropping
https://www9.lunapic.com/editor/
half star needs to be edited again
https://stock.adobe.com/search?k=half+star+rating&asset_id=316517095

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

insert into tempitems (title, price, description, category, image, "count", rating, important_id)
values('title', 12.2, 'description', 'category', 'image', 2.21, 2.1, 8)



### creating test tables
create table post(
	id serial primary key,
	name varchar(255),
	content text,
	user_id int,
	constraint fk_user
		foreign key(user_id)
			references "tempuser"(id)
)

create table tempuser(
	id serial primary key,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	age int
)


select * from "tempuser" join post on "post".user_id = "tempuser".id;

select "tempuser".*, post.id, post.name as title, post.content, post.user_id from "tempuser" join post on "post".user_id = "tempuser".id;

select "tempuser".*, post.id as post_id, post.name as title, post.content, post.user_id from "tempuser" join post on "post".user_id = "tempuser".id;