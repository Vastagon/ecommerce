import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import fullStar from "../../public/images/fullstar-cropped.png"
import halfStar from "../../public/images/halfstar-cropped.png"
import emptyStar from "../../public/images/emptystar-cropped.png"
import { uuid } from "uuidv4"


type ShoppingPageProps = {
  title: string
  image: string
  id: number
  price: number
  rating: number
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const {addToCart, cart} = useContext(UserContext)
  const [stars, setStars] = useState<any>()
  const item =  {title: props.title, image: props.image, id: props.id, price: props.price, rating: props.rating}
  const router = useRouter()

  function goToItemPage(id: number){
    router.push(`/Store/${id}`)
  }

  useEffect(() =>{
    const tempArray = []
    ///This is 3
    const fullStars = Math.floor(props.rating)
    ///This is half
    const halfStars = props.rating - fullStars


    ///Need one more that's empty
    let halfStarCreated = false
    for(let i = 0; i < 5; i++){
      if(fullStars > i){
        tempArray.push("full")
      }else if((halfStars > .3 && halfStars < .9) && !halfStarCreated){
        tempArray.push("half")
        halfStarCreated = true
      }else{
        tempArray.push("empty")
      }
    }

    setStars(tempArray.map((prev) => {
      let selectedImage
      if(prev === "full") selectedImage = fullStar
      if(prev === "half") selectedImage = halfStar
      if(prev === "empty") selectedImage = emptyStar

      if(selectedImage)
      return(
        <Image key={uuid()} className={styles.stars} width={10} height={10} alt="Item Image" src={selectedImage} />
      )      
    }))


  }, [])

  ///Decides if the card or the button was clicked
  function cardClicked(e: any, id: number){
    if(e.target.name === "cart button"){
      addToCart(item, item.id.toString(), cart)
    }else{
      goToItemPage(id)
    }
  }

  if(!stars) return null
  return (
    <div onClick={(e) => cardClicked(e, props.id)} className={styles.store_page_card}>
      <Image className={styles.card_image} loader={() => props.image} width={100} height={200} alt="Item Image" src={props.image} />
      <p className={styles.card_title}>{props.title}</p>

      <div className={styles.card_price_and_review_container}>
        <p className={styles.card_price}>${props.price}</p>
        <p className={styles.card_rating}>{props.rating}</p>
        {stars}
      </div>

      <button name="cart button" className={styles.card_button} >Add to cart</button>
    </div>
  )
}

// &#11088;