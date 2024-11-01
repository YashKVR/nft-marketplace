import React from 'react'
import { ThemeProvider } from "next-themes";
import Script from 'next/script'
import { NFTProvider } from '@/context/NFTContext';

const Providers = ({ children }) => {
    return (
        <NFTProvider>
            <ThemeProvider attribute='class' defaultTheme='dark'>
                <div className='dark:bg-nft-dark bg-white min-h-screen'>
                    {children}
                </div>

                <Script src="https://kit.fontawesome.com/117e3cae78.js" crossorigin="anonymous" />
            </ThemeProvider>
        </NFTProvider>
    )
}

export default Providers