import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
const prisma = new PrismaClient()

type ResponseObject = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: any
}  

async function runEverything(){
    const data = await fetch('https://fakestoreapi.com/products')
    const dataObject = await data.json()
    
    if (!data.ok || !dataObject) {
        throw new Error("Page Not Found 404");
    }
    const unknownArray = Object.values(dataObject);

    unknownArray.forEach((data: { id: number; title: string; price: number; description: string; category: string; image: string; rating: any; }) =>{
        addItem(data.id, data.title, data.price, data.description, data.category, data.image, data.rating)
    })
}




async function addItem(id: number, title: string, price: number, description: string, category: string, image: string, rating: any){
    const result = await prisma.items.create({
        data: {
            id: id,
            title: title,
            price: price,
            description: description,
            category: category,
            image: image,
            rating: rating.rate,
            count: rating.count
        }
    })
    console.log(`Added: ${title}`)
    
}


runEverything()