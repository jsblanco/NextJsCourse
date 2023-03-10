import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang={'es'}>
                <Head/>
                <body>
                <Main/>
                <NextScript/>
                <div id="notifications"/>
                </body>
            </Html>
        )
    }
}
