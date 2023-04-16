import styles from "../styles/Login.module.css"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage(){

    return(
        <main className={styles.login_page}>
            <form className={styles.login_form}>
                {/* <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" /> */}
                <button onClick={() => signIn()}>Sign in</button>
            </form>
        </main>
    )
}