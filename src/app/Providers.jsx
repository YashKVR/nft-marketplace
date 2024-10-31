import React from 'react'
import { ThemeProvider } from "next-themes";
import Script from 'next/script'

const Providers = ({ children }) => {
    return (
        <>
            <ThemeProvider attribute='class' defaultTheme='dark'>
                <div className='dark:bg-nft-dark bg-white min-h-screen'>
                    {children}
                </div>

                <Script src="https://kit.fontawesome.com/117e3cae78.js" crossorigin="anonymous" />
            </ThemeProvider>
        </>
    )
}

export default Providers