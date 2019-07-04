import { Container } from 'next/app'
import * as React from 'react'

export default props => {
    const { Component, pageProps } = props

    return (
        <React.Fragment>
            <Container>
                <Component {...pageProps} />
                <div>
                    <p>
                        __webpack_public_path__ in _app.js:{' '}
                        {__webpack_public_path__}
                    </p>
                </div>
            </Container>
        </React.Fragment>
    )
}
