// next/src/utils/index.ts

// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';
// AxiosResponse、AxiosError は axios ライブラリが提供する型で、それぞれ「正常に返ってきたレスポンス」「リクエストエラー」の型を定義します。

export const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.message);
      throw err;
    });
