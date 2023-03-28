import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import fullStar from "../../public/images/fullstar-cropped.png"
import halfStar from "../../public/images/halfstar-cropped.png"
import emptyStar from "../../public/images/emptystar-cropped.png"


type ShoppingPageProps = {
  title: string
  image: string
  id: number
  price: number
  rating: number
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const {addToCart, cart} = useContext(UserContext)
  const [stars, setStars] = useState()
  const item =  {title: props.title, image: props.image, id: props.id, price: props.price, rating: props.rating}
  const router = useRouter()

  function goToItemPage(id: number){
    router.push(`/Store/${id}`)
  }

  useEffect(() =>{
    ///This is 3
    const fullStars = Math.floor(props.rating)
    ///This is half
    const halfStars = props.rating - fullStars

    ///Need one more that's empty
    for(let i = fullStars; i < 5; i++){
      if(fullStars > i){
        ///return full star
      }else if(halfStars){
        ///return a half star
      }else{
        ///return an empty star
      }
    }
  }, [])

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
        <Image className={styles.stars} width={10} height={10} alt="Item Image" src={fullStar} />
        <Image className={styles.stars} width={10} height={10} alt="Item Image" src={emptyStar} />
        <Image className={styles.stars} width={10} height={10} alt="Item Image" src={halfStar} />
      </div>

      <button name="cart button" className={styles.card_button} >Add to cart</button>
    </div>
  )
}