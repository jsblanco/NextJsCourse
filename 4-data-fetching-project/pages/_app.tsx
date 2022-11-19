import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>NextJS events</title>
                <meta name="description" content="Project to learn NextJs"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}
