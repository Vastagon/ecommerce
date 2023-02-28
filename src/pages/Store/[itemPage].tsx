import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css"
import axios from "axios";
import {useEffect, useState} from "react"


type itemPageProps = {
    itemInfo: any
}

export default function itemPage(props: itemPageProps){
    const router = useRouter()
    const [items, setItems] = useState({title: "SAD"})
    console.log("DSAKHJ")
    useEffect(() =>{
        ///Might be undefined
        if(router.isReady){
            const itemRoute = router.query.itemPage
            console.log(itemRoute)
            getInfo(itemRoute)
        }
    }, [router.isReady])

    async function getInfo(itemRoute: any){
        const res = await axios.post("http://localhost:3000/api/getItems", {title: itemRoute})
        setItems(res.data.itemInfo)
    }

    
    return(
        <main className={styles.item_page}>
            Item Page {items.title}
        </main>
    )
}