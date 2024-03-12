// next/src/pages/_app.tsx
// * _app.tsxはNext.jsで元々用意されているファイルで、全ページで共通するレイアウトや状態を管理する役割を持っています。
// MUI と emotion の設定を追加していきます。

// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// eslint-disable-next-line import/named
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import * as React from 'react';
// * 自作した reset cssを適用
import '@/styles/destyle.css';
import Header from '@/components/Header';

import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
