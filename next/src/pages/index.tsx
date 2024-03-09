// next/src/pages/index.tsx

import type { NextPage } from 'next';
import useSWR from 'swr';
import { fetcher } from '@/utils';

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check';
  // swrライブラリから取得したuseSWRという関数を利用し、RailsAPIに対してリクエストを送る useSWRの挙動としては、まず第一引数のurlを、第二引数のfetcherに渡してfetcherを動作させます。その後、レスポンスが正常にその結果をdataに、エラーが発生したらその内容をerrorに代入します。
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
    </>
  );
};

export default Index;
