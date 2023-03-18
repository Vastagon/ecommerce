import styles from "@/styles/CartModal.module.css"
import { useState, useContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect } from "react"
import { uuid } from "uuidv4"
import { UserContext } from "./UserContext"

export default function CartModal(){
    const {cart} = useContext(UserContext)
    const [itemListDivs, setItemListDivs] = useState()
    console.log(cart)
    useEffect(() =>{
        setItemListDivs(cart.map((prev: any) => {
            return(
                <div key={uuid()}>{prev}</div>
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