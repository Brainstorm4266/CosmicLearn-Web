import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Script from 'next/script'

export default function Home() {
  const handleSubmit = async (event) => {
    login(event)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CosmicLearn Web</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
        <meta httpEquiv="Pragma" content="no-cache"/>
        <meta httpEquiv="Expires" content="0"/>
        <meta name="description" content="The CosmicLearn Web App!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to CosmicLearn!</h1>

        <div className={`${styles.loading} ${styles.fadingAnim}`} id="loading">
          <p id="loadtext">Getting information from server...<br/>(If this does not go away soon, enable JavaScript, check your internet, or reload the webpage.)</p>
        </div>
        <div className={`${styles.login} ${styles.hidden}`} id="login">
          <h3 className={styles.loginText}>You may log into this server, or log on as guest.</h3>

          <form className={styles.loginForm} action="/api/login" method="post" onSubmit={handleSubmit}>
            <input type="text" id="usern" name="usern" placeholder="Username" required /><br/>
            <input type="password" id="pass" name="pass" placeholder="Password" required /><br/>
            <button type="submit">Log in</button><br/>
          </form>
          <p className={`${styles.loginError} ${styles.hidden}`} id="loginError">Login error</p>
          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          <p className={styles.footerServerName} id="servname">Server Name: cosmic test server</p>
        </div>
        </main>
        <div id="allStyles" styles={JSON.stringify(styles)}></div>

        <Script src="/scripts/homepageScript.js"></Script>
    </div>
  )
}
