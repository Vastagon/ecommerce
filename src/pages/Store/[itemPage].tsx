import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css"
import axios from "axios";
import {useEffect, useState} from "react"
import Image from "next/image";
import Loading from "@/components/Loading";
import { UserContext } from '../../components/UserContext'
import { useContext } from "react"

type itemInfo = {
    category: string
    count: number
    item_description: string
    price: number
    rating: number
    title: string
    image_path: string
}

export default function itemPage(){
    const {addToCart} = useContext(UserContext)
    const router = useRouter()
    const [item, setItem] = useState<itemInfo>()
    const [itemRoute, setItemRoute] = useState<any>()

    useEffect(() =>{
        if(router.isReady){
            setItemRoute(router.query.itemPage)
            getCardInfo(router.query.itemPage)
        }
    }, [router.isReady])

    async function getCardInfo(itemRoute: string | string[] | undefined){
        const res = await axios.post("http://localhost:3000/api/getIndividualItem", {id: itemRoute})
        setItem(res.data.itemInfo)
    }


    ///I can use category for a tag search system
    if(!item) return <Loading />
    return(
        <main className={styles.item_page}>
            <Image width={100} height={100} src={item.image_path} className={styles.item_image} alt="ads" />

            <div className={styles.item_info}>
                <h1>{item.title}</h1>
                <div className={styles.rating_div}>
                    <p className={styles.rating_number}>⭐{item.rating}</p>
                    {/* <p>{item.count} Reviews</p> */}
                </div>
                <p className={styles.item_price}>${item.price}</p>
                <p className={styles.item_description}>{item.item_description}</p>

                <button onClick={() => {addToCart(item, item.title)}}>Add to Cart</button>
            </div>
        </main>
    )
}