// next/src/styles/index.ts

import { css } from '@emotion/react';

export const styles = {
  // * importした Header分の高さを引き、縦軸への無駄なスクロールが発生しないようにする
  pageMinHeight: css({
    minHeight: 'calc(100vh - 64px)',
  }),
};
