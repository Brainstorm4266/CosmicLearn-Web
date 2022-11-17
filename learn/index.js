import Head from 'next/head'
import styles from '../../../styles/Learn.module.scss'
import Script from 'next/script'

export default function Learn() {
    return (
        <div>
            <Head>
                <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
                <meta httpEquiv="Pragma" content="no-cache"/>
                <meta httpEquiv="Expires" content="0"/>
            </Head>
            <p>Todo</p>
            <Script src="/scripts/learn.js"/>
        </div>
    )
}
