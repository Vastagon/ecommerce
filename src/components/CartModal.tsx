import styles from "@/styles/CartModal.module.css"
import Image from "next/image"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { uuid } from "uuidv4"
import { UserContext } from "./UserContext"
import { useRouter } from "next/router"

export default function CartModal(){
    const router = useRouter()
    const {cart, setCart, sessionState} = useContext(UserContext)
    const [itemListDivs, setItemListDivs] = useState()

    async function cardOrButtonClicked(e: any, routerPath: string){
        if(e.target.name === "cartDelButton"){
            console.log(`Routerpath: ${routerPath}`)
            const req = await axios.post("http://localhost:3000/api/deleteItemFromCart", {title: routerPath, email: sessionState!.user!.email})
            
            ///Remove item from cart here
        }else{
            ///Go to page here
            router.push(`/Store/${routerPath}`)
        }
    }

    useEffect(() =>{
        setItemListDivs(cart.map((prev: any) => {
            return(
                <div onClick={(e) => {cardOrButtonClicked(e, prev)}} className={styles.item} key={uuid()}>
                    <Image className={styles.item_image} loader={() => "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"} src="https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg" alt="asd" width={10} height={10} />
                    <div className={styles.right_side}>
                        <p className={styles.item_name}>{prev}</p>
                        <button name="cartDelButton" className={styles.remove_button}>Remove</button>
                    </div>
                </div>
            )
        }))
    }, [cart])



    if(!cart) return null
    return(
        <div id="cartModal" className={styles.cart_modal_container}>
            <div className={styles.position_container}>
                <span className={styles.arrow_up}></span>
                
                {itemListDivs}
            </div>
        </div>
    )
}