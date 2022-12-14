import '../styles/globals.css'
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../utils/theme";
import createEmotionCache from '../utils/createEmotionCache'
import {CacheProvider, EmotionCache} from "@emotion/react";
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from "react-redux";
import {wrapper} from "../store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout,
    emotionCache?: EmotionCache,
}

// interface MyAppProps extends AppProps {
//     Component: NextPageWithLayout,
//     emotionCache?: EmotionCache;
// }

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({Component, ...rest}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps, emotionCache = clientSideEmotionCache } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <Provider store={store}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
            </Provider>
        </CacheProvider>
    )
}

// import * as React from 'react';
// import Head from 'next/head';
// import CssBaseline from '@mui/material/CssBaseline';
// import {AppProps} from 'next/app';
// import {ThemeProvider} from '@mui/material/styles';
// import {CacheProvider, EmotionCache} from '@emotion/react';
// import {theme} from '../utils/theme';
// import createEmotionCache from '../utils/createEmotionCache';
//
//
// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();
//
// interface MyAppProps extends AppProps {
//     emotionCache?: EmotionCache;
// }
//
// export default function MyApp(props: MyAppProps) {
//     const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
//     const getLayout = Component.getLayout ?? ((page) => page)
//     return (
//         <CacheProvider value={emotionCache}>
//             <Head>
//                 <meta name="viewport" content="initial-scale=1, width=device-width"/>
//             </Head>
//             <ThemeProvider theme={theme}>
//                 {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//                 <CssBaseline/>
//                 <Component {...pageProps} />
//             </ThemeProvider>
//         </CacheProvider>
//     );
// }