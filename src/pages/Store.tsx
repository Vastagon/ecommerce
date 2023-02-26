import ShoppingPageCard from "@/components/ShoppingPageCard"
import styles from "../styles/Store.module.css"
import { v4 as uuid } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getServerSideProps(){
    const items = await prisma.items.findMany()

    return{
        props: {
            items: items
        }
    }
}


async function buttonClicked(){
    ///Make a request to server and have the server add the item

    // const item = await prisma.items.create({
    //     data:{
    //         imagePath: "NJDASNJK",
    //         name: "Jacob",
    //         user_id: 1
    //     }
    // })
}

export default function Store(props: any){
    console.log(props.items)
    const cards = props.items.map((prev: { name: string; imagePath: string; }) => {
        return(
            <ShoppingPageCard 
            key={uuid()}
            name= {prev.name}
            imagePath={prev.imagePath}
            />              
        )
    })

    return (
        <main className={styles.store_page_card_container}>
            {cards}
            <button onClick={buttonClicked}>Button</button>
        </main>
    )
}