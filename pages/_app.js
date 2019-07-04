import { Container } from 'next/app'
import * as React from 'react'

export default props => {
    const { Component, pageProps } = props

    return (
        <React.Fragment>
            <Container>
                <Component {...pageProps} />
            </Container>
        </React.Fragment>
    )
}
