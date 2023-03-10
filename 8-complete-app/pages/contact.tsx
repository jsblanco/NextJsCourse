import Head from 'next/head';
import ContactForm from '../components/contact/ContactForm';

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact me</title>
                <meta name="description" content="Send me a message"/>
            </Head>
            <ContactForm/>
        </>
    )
}
