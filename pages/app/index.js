import Head from 'next/head'
import styles from '../../styles/App.module.scss'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App() { //TODO: make this a single-page app, do not use /app/learn or stuff like that.
    const router = useRouter()

    useEffect(() => {
        window.shallowRedirect = (url) => {
            router.push(url, undefined, {shallow: true})
        }
        window.redirect = (url) => {
            router.push(url)
        }
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>CosmicLearn Web</title>
                <meta name="description" content="The CosmicLearn Web App!" />
                <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
                <meta httpEquiv="Pragma" content="no-cache"/>
                <meta httpEquiv="Expires" content="0"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
            <h1 className={styles.title} id="title">CosmicLearn</h1>

            <div className={`${styles.loading} ${styles.fadingAnim}`} id="loading">
              <p id="loadtext">Boop! Downloading user information to client.<br></br>(This should go away in a few seconds. If it doesn&lsquo;t, check your connection, or reload the webpage.)</p>
            </div>
            <div className={`${styles.pscreen} ${styles.hidden}`} id="primary-screen">
                <h3 className={styles.username} id="uname">Hi, Guest!</h3>
                <div className={styles.buttons}>
                    <span className={styles.bigbutton} id="learnset"><h3>Learn Set</h3><p>Learn sets here.</p></span>
                    <span className={styles.bigbutton} id="createset"><h3>Create Set</h3><p>Create a new set here.</p></span>
                    <span className={styles.bigbutton} id="publicsets"><h3>Find Sets</h3><p>Find a public set on this server.</p></span>
                    <span className={styles.bigbutton} id="settings"><h3>Settings</h3><p>Set stuff up here.</p></span>
                </div>
            </div>
            </main>
            <div id="allStyles" styles={JSON.stringify(styles)}></div>
            <Script src="/scripts/app.js"></Script>
        </div>
    )
}