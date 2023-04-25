## Description

An ecommerce website built using NextJS and PostgreSQL that allows user to add items to cart, uses dynamic routes for each item, and allows them to sign-in for a wishlist and to persist the items in their cart. This is using nextauth.

# Setup the Developer Enviornment
1. Download the repo and install node modules with `npm install`
2. Install PostgreSQL if you don't already have it installed
3. Open a PSQL shell and create a database called ecommerce
4. Run the sql files in the script folder with `\i` in this order: Ecommerce > Items > Users
5. Run the enviornment with `npm run dev`

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

## ESLint
Lint the entire project
`npm run lint -- --fix`
