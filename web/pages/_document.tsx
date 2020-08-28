import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import React from 'react';
import {ServerStyleSheets} from "@material-ui/styles";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
                <React.Fragment key="styles">
                    {initialProps.styles}
                    {sheets.getStyleElement()}
                </React.Fragment>,
            ],
        };
    }

    render() {
        return (
            <Html style={{backgroundColor: "#F2F2F2", height: "100%"}}>
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                    <title>Web Masificador</title>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                    <link rel="shortcut icon" type="image/png" href="/static/M.png"/>
                </Head>
                <body style={{margin: 0, height: "100%"}}>
                <style>{`
                div#__next {
                    height: 100%
                }
                `}
                </style>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
