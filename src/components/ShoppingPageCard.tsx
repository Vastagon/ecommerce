import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'
import { useContext } from "react"
import { UserContext } from "./UserContext"

type ShoppingPageProps = {
  title: string
  image: string
  id: number
  price: number
  rating: number
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const {addToCart, cart} = useContext(UserContext)
  const item =  {title: props.title, image: props.image, id: props.id, price: props.price, rating: props.rating}
  const router = useRouter()

  function goToItemPage(id: number){
    router.push(`/Store/${id}`)
  }

  ///Decides if the card or the button was clicked
  function cardClicked(e: any, id: number){
    if(e.target.name === "cart button"){
      addToCart(item, item.id.toString(), cart)
    }else{
      goToItemPage(id)
    }
  }

  return (
    <div onClick={(e) => cardClicked(e, props.id)} className={styles.store_page_card}>
      <Image className={styles.card_image} loader={() => props.image} width={100} height={200} alt="Item Image" src={props.image} />
      <p className={styles.card_title}>{props.title}</p>

      <div className={styles.card_price_and_review_container}>
        <p className={styles.card_price}>${props.price}</p>
        <p className={styles.card_rating}>&#11088;{props.rating}</p>
      </div>

      <button name="cart button" className={styles.card_button} >Add to cart</button>
    </div>
  )
}