// next/src/pages/confirmation.tsx

import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSnackbarState } from '@/hooks/useGlobalState';

const Confirmation: NextPage = () => {
  const router = useRouter();
  const [, setSnackbar] = useSnackbarState();

  // * Next.jsのコンテキストでは、router.isReadyはNext.jsルーターオブジェクトのプロパティで、ルーターがクエリーを処理する準備ができているかどうかを示す
  // * このプロパティは、ルートパラメータやクエリ文字列を扱うときに特に重要
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // * rails/app/views/devise/mailer/confirmation_instructions.erbの中の認証メール内のリダイレクトurl
    // * "#{Settings.front_domain}/confirmation?confirmation_token=#{@token}"を確認している
    if (router.query['confirmation_token']) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/user/confirmations';

      console.log('router.query :>> ', router.query);
      // {confirmation_token: tzJmCYs2h4ZpoWQ7vRNy }

      axios({ method: 'PATCH', url: url, data: router.query })
        .then(() => {
          setSnackbar({
            message: '認証に成功しました',
            severity: 'success',
            pathname: '/sign_in',
          });
          router.push('/sign_in');
        })
        .catch((e: AxiosError<{ message: string }>) => {
          console.log(e.message);
          // Check if the error response exists and has the expected structure
          const errorMessage =
            e.response && e.response.data && e.response.data.message
              ? e.response.data.message //例.すでにそのユーザーは認証されています。
              : '不正なアクセスです'; // Fallback message if the expected error information is not available
          setSnackbar({
            // message: '不正なアクセスです',
            message: errorMessage,
            severity: 'error',
            pathname: '/',
          });
          router.push('/');
        });
    } else {
      setSnackbar({
        message: '不正なアクセスです',
        severity: 'error',
        pathname: '/',
      });
      router.push('/');
    }
  }, [router, setSnackbar]);

  return <></>;
};

export default Confirmation;
