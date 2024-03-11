// next/src/pages/index.tsx

import { Box, Grid, Container, Pagination } from '@mui/material';
// * railsから受け取ったレスポンスボディーのJSONのキーはスネークケースになっているのをキャメルケースにする
import camelcaseKeys from 'camelcase-keys';
// * Next ページコンポーネントの型を指定するために、import type { NextPage } from 'next'が必要
import type { NextPage } from 'next';
// * <Link>コンポーネントは Next.js に標準で搭載されているライブラリで、配下のJSXにリンクを付与することができます。
import Link from 'next/link';
// *
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ArticleCard from '@/components/ArtificialCard';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { styles } from '@/styles';
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
  // const url = 'http://localhost:3000/api/v1/articles';
  const router = useRouter();
  const page = 'page' in router.query ? Number(router.query.page) : 1;
  console.log('router.query :>> ', router.query);
  // * 環境変数を使用
  // const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles';
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/?page=' + page;

  // *  RailsAPI からの articls レコードの取得を行う
  // swrライブラリから取得したuseSWRという関数を利用し、RailsAPIに対してリクエストを送る
  // useSWRの挙動としては、まず第一引数のurlを、第二引数のfetcherに渡してfetcherを動作させます。
  // その後、レスポンスが正常にその結果をdataに、エラーが発生したらその内容をerrorに代入します。
  const { data, error } = useSWR(url, fetcher);
  // if (error) return <div>An error has occurred.</div>;
  if (error) return <Error />;
  // if (!data) return <div>Loading...</div>;
  if (!data) return <Loading />;

  console.log('data :>> ', data);

  // * railsから受け取ったレスポンスボディーのJSONのキーはスネークケースになっているのをキャメルケースにする
  const articles = camelcaseKeys(data.articles);
  // * ページネーションで使用
  const meta = camelcaseKeys(data.meta);

  // * material UIのPagination内での onChangeなので、クリックされたページ番号をvalueとして受け取ることができる
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value);
  };

  return (
    // <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh' }}>
    // * importした Header分の高さを引き、無駄な縦スクロールをしないようにする
    // <Box sx={{ backgroundColor: '#e6f2ff', minHeight: 'calc(100vh - 64px)' }}>
    // * emotionを使った 上記のcss を使い回せるように共通化した
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          {/* countプロパティには全体のページ数、pageプロパティには現在のページ番号を与えます。 */}
          <Pagination
            count={meta.totalPages}
            page={meta.currentPage}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
