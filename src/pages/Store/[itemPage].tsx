import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css"
import axios from "axios";
import {useEffect, useState} from "react"
import Image from "next/image";
import Loading from "@/components/Loading";

type itemPageProps = {
    itemInfo: any
}

export default function itemPage(props: itemPageProps){
    const router = useRouter()
    const [items, setItems] = useState({category: "", count: 0, description: "", price: 0, rating: 0, title: "", image: ""})
    useEffect(() =>{
        ///Might be undefined
        if(router.isReady){
            const itemRoute = router.query.itemPage
            getInfo(itemRoute)
        }
    }, [router.isReady])

    async function getInfo(itemRoute: any){
        console.log(itemRoute)
        const res = await axios.post("http://localhost:3000/api/getItems", {id: itemRoute})
        setItems(res.data.itemInfo)
    }

    ///I can use category for a tag search system
    console.log(items)
    if(!items) return <Loading />
    return(
        <main className={styles.item_page}>
            <Image loader={() => items.image} width={100} height={100} src={items.image} className={styles.item_image} alt="ads" />

            <div className={styles.item_info}>
                <h1>{items.title}</h1>
                <div className={styles.rating_div}>
                    <p className={styles.rating_number}>⭐{items.rating}</p>
                    <p>{items.count} Reviews</p>
                </div>
                <p className={styles.item_price}>${items.price}</p>
                <p className={styles.item_description}>{items.description}</p>

                <button>Add to Cart</button>
            </div>
        </main>
    )
}