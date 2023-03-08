import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css"
import axios from "axios";
import {useEffect, useState} from "react"
import Image from "next/image";
import Loading from "@/components/Loading";
import { useSession, signIn, signOut } from "next-auth/react"

type itemPageProps = {
    itemInfo: any
}
type itemInfo = {
    category: string
    count: number
    description: string
    price: number
    rating: number
    title: string
    image: string
}

export default function itemPage(props: itemPageProps){
    const router = useRouter()
    const session = useSession()
    const [item, setItem] = useState<itemInfo>()
    const [cart, setCart] = useState<Array<string>>([])

    useEffect(() =>{
        ///Might be undefined
        if(router.isReady){
            const itemRoute = router.query.itemPage
            getInfo(itemRoute)
        }
    }, [router.isReady])

    async function getInfo(itemRoute: string | string[] | undefined){
        const res = await axios.post("http://localhost:3000/api/getItems", {id: itemRoute})
        setItem(res.data.itemInfo)
    }

    async function addToCart(){
        if(item){
            if(session){
                const itemRoute = router.query.itemPage
                ///Add to DB
                cart.push(item.title)
                const res = await axios.post("http://localhost:3000/api/updateCart", {id: itemRoute})

            }else{
                ///Add to state
                cart.push(item.title)
            }            
        }

        console.log(cart)
    }

    ///I can use category for a tag search system
    if(!item) return <Loading />
    return(
        <main className={styles.item_page}>
            <Image loader={() => item.image} width={100} height={100} src={item.image} className={styles.item_image} alt="ads" />

            <div className={styles.item_info}>
                <h1>{item.title}</h1>
                <div className={styles.rating_div}>
                    <p className={styles.rating_number}>⭐{item.rating}</p>
                    <p>{item.count} Reviews</p>
                </div>
                <p className={styles.item_price}>${item.price}</p>
                <p className={styles.item_description}>{item.description}</p>

                <button onClick={addToCart}>Add to Cart</button>
            </div>
        </main>
    )
}