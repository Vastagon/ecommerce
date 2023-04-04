import ShoppingPageCard from "@/components/ShoppingPageCard"
import styles from "../../styles/Store.module.css"
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";


type cardProps = {
    map: any
    title: string
    image: string
    id: number 
}


export default function Store(){
    const [items, setItems] = useState<cardProps>()
    const [cards, setCards] = useState()

    async function getStoreCards(){
        const req = await axios.post("http://localhost:3000/api/getStoreCards")
        setItems(req.data.storeCards)
    }

    useEffect(() =>{
        getStoreCards()
    }, [])

    useEffect(() =>{
        if(items){
            setCards(items.map((prev: { title: string; image: string; id: number, price: number, rating: number }) => {
                return(
                    <ShoppingPageCard 
                        key={uuid()}
                        id={prev.id}
                        title= {prev.title}
                        image={prev.image}
                        price={prev.price}
                        rating={prev.rating}
                    />              
                )
            }))
        }
    }, [items])


    if(!items) return <Loading />

    return (
        <main className={styles.store_page_card_container}>
            {cards}
        </main>
    )
}