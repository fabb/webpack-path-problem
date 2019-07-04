import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <body>
                    <Main />
                    <div>
                        <p>__webpack_public_path__ in _document.js: {__webpack_public_path__}</p>
                    </div>
                    <NextScript />
                </body>
            </html>
        )
    }
}
