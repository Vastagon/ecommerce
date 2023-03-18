import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'
import axios from "axios"

type ShoppingPageProps = {
  title: string
  image: string
  id: number
  price: number
  rating: number
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const router = useRouter()

  function goToItemPage(id: number){
    router.push(`/Store/${id}`)
  }

  async function addItemToCart(id: number){
    // axios.post()
  }

  function cardClicked(id: number, whatToDo: string){
    if(whatToDo === "goToCard"){
      goToItemPage(id)
    }else{
      addItemToCart(id)
    }
  }

  return (
    <div onClick={() => cardClicked(props.id, "goToCard")} className={styles.store_page_card}>
      <Image className={styles.card_image} loader={() => props.image} width={100} height={200} alt="Item Image" src={props.image} />
      <p className={styles.card_title}>{props.title}</p>

      <div className={styles.card_price_and_review_container}>
        <p className={styles.card_price}>${props.price}</p>
        <p className={styles.card_rating}>&#11088;{props.rating}</p>
      </div>

      <button className={styles.card_button} onClick={() => cardClicked(props.id, "addToCart")}>Add to cart</button>
    </div>
  )
}