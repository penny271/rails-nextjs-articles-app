// next/src/styles/createEmotionCache.ts

// eslint-disable-next-line import/named
import createCache, { EmotionCache } from '@emotion/cache';

export default function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}
