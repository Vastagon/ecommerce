import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'

type ShoppingPageProps = {
  title: string
  image: string
  id: number
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const router = useRouter()

  function goToItemPage(id: number){
    router.push(`/Store/${id}`)
  }


  return (
    <div onClick={() => goToItemPage(props.id)} className={styles.store_page_card}>
      <Image className={styles.card_image} loader={() => props.image} width={100} height={200} alt="Item Image" src={props.image} />
      <p className={styles.card_title}>{props.title}</p>
    </div>
  )
}