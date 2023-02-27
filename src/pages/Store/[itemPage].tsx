import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css"
import { PrismaClient } from '@prisma/client';
import axios from "axios";
import {useEffect, useState} from "react"

// const prisma = new PrismaClient()
// const router = useRouter()

// export async function getServerSideProps(){
//     const router = useRouter()
//     const itemRoute = router.query.itemPage
//     console.log(itemRoute)

//     // const item = await prisma.items.findFirst({
//     //     where: {
//     //         name: itemRoute 
//     //     }
//     // })
//     const item = 1
//     return{
//         props: {
//             itemInfo: item
//         }
//     }
// }

// export async function getServerSideProps(){
//     const itemRoute = router.query.itemPage
//     console.log(itemRoute)
//     // const res = await axios.post("http://localhost:3000/api/getItems", {name: })

//     return{
//         props: {
//             itemInfo: "SAD"
//         }
//     }
// }

type itemPageProps = {
    itemInfo: any
}

export default function itemPage(props: itemPageProps){
    const router = useRouter()
    const [items, setItems] = useState({name: "SAD"})

    console.log(items)
    useEffect(() =>{
        ///Might be undefined
        const itemRoute = router.query.itemPage
        console.log(itemRoute)
        getInfo(itemRoute)
    }, [])

    async function getInfo(itemRoute: any){
        const res = await axios.post("http://localhost:3000/api/getItems", {name: itemRoute})
        setItems(res.data.itemInfo)
    }

    
    return(
        <main className={styles.item_page}>
            Item Page {items.name}
        </main>
    )
}