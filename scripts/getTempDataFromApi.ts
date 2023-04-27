// import { PrismaClient } from "@prisma/client";
// import fetch from "node-fetch";
// const prisma = new PrismaClient();



// async function runEverything(){
//   const data = await fetch("https://fakestoreapi.com/products");
//   const dataObject = await data.json();

//   if (!data.ok || !dataObject) {
//     throw new Error("Page Not Found 404");
//   }
//   const unknownArray = Object.values(dataObject);

//   unknownArray.forEach((data: { item_uid: number; title: string; price: number; description: string; category: string; image: string; rating: any; }) =>{
//     if(data.title.substring(data.title.length-1) === " "){
//       data.title = data.title.substring(0,data.title.length-1);
//     }
//     addItem(data.item_uid, data.title, data.price, data.description, data.category, data.image, data.rating);
//   });
// }




// async function addItem(item_uid: number, title: string, price: number, description: string, category: string, image: string, rating: any){
// const result = await prisma.items.create({
//     data: {
//       item_uid: id,
//       title: title,
//       price: price,
//       description: description,
//       category: category,
//       image: image,
//       rating: rating.rate,
//       count: rating.count
//     }
//   });
//   console.log(`Added: ${title}`);

// }

export { };
// runEverything()