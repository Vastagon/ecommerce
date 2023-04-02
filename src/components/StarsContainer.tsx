import fullStar from "../../public/images/fullstar-cropped.png"
import halfStar from "../../public/images/halfstar-cropped.png"
import emptyStar from "../../public/images/emptystar-cropped.png"

import Image from "next/image"
import styles from "../styles/Store.module.css"

type starsProps = {
    image: any
}

export default function StarsContainer(props: starsProps){


    return(
        <Image className={styles.stars} width={10} height={10} alt="Item Image" src={props.image} />
    )
}