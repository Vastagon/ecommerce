import ShoppingPageCard from "@/components/ShoppingPageCard"
import styles from "../styles/Store.module.css"
import db from "../components/db.json"
import { v4 as uuid } from 'uuid';


export default function Store(){

    const cards = db.map(prev => {
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
        </main>
    )
}