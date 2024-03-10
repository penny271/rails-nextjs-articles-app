// next/src/pages/index.tsx

import { Box, Grid, Container } from '@mui/material';
// * railsから受け取ったレスポンスボディーのJSONのキーはスネークケースになっているのをキャメルケースにする
import camelcaseKeys from 'camelcase-keys';
// * Next ページコンポーネントの型を指定するために、import type { NextPage } from 'next'が必要
import type { NextPage } from 'next';
// * <Link>コンポーネントは Next.js に標準で搭載されているライブラリで、配下のJSXにリンクを付与することができます。
import Link from 'next/link';
import useSWR from 'swr';
import ArticleCard from '@/components/ArtificialCard';
import { fetcher } from '@/utils';

type ArticleProps = {
  id: number;
  title: string;
  createdAt: string;
  fromToday: string;
  user: {
    name: string;
  };
};

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/articles';

  // *  RailsAPI からの articls レコードの取得を行う
  // swrライブラリから取得したuseSWRという関数を利用し、RailsAPIに対してリクエストを送る
  // useSWRの挙動としては、まず第一引数のurlを、第二引数のfetcherに渡してfetcherを動作させます。
  // その後、レスポンスが正常にその結果をdataに、エラーが発生したらその内容をerrorに代入します。
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  console.log('data :>> ', data);

  // * railsから受け取ったレスポンスボディーのJSONのキーはスネークケースになっているのをキャメルケースにする
  const articles = camelcaseKeys(data.articles);

  return (
    <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ pt: 6 }}>
        <Grid container spacing={4}>
          {articles.map((article: ArticleProps, i: number) => (
            // xs(0px)以上〜md(900px)未満: グリッドコンテナーに対して 100%（12÷12） の幅
            // md(900px)以上: グリッドコンテナーに対して 50%（6÷12） の幅
            <Grid key={i} item xs={12} md={6}>
              {/* リンクを付与 */}
              <Link href={'/articles/' + article.id}>
                <ArticleCard
                  title={article.title}
                  fromToday={article.fromToday}
                  userName={article.user.name}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
