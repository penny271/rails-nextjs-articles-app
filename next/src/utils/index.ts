// next/src/utils/index.ts

// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';
// AxiosResponse、AxiosError は axios ライブラリが提供する型で、それぞれ「正常に返ってきたレスポンス」「リクエストエラー」の型を定義します。

export const fetcher = (url: string) => {
  console.log('fetcher関数発動...');

  return (
    axios
      // .get(url)
      // * 認証情報をヘッダーに乗せられるようにする
      // * '/current/articles' で特定のユーザーの記事一覧を取得できるようにするため
      // * つまり、'/articles/' と '/current/articles' 両方のデータを 引数urlごとに取得できるようにしている
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => {
        console.log(err.message);
        throw err;
      })
  );
};
