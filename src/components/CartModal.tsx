import styles from "@/styles/CartModal.module.css"
import Image from "next/image"
import { useState, useContext, useEffect } from "react"
import { uuid } from "uuidv4"
import { UserContext } from "./UserContext"
import { useRouter } from "next/router"

export default function CartModal(){
    const router = useRouter()
    const {cart} = useContext(UserContext)
    const [itemListDivs, setItemListDivs] = useState()

    function cardOrButtonClicked(e: any, routerPath: string){
        if(e.target.name === "cartDelButton"){
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
        <div className={styles.cart_modal_container}>
            {itemListDivs}
        </div>
    )
}