// next/src/pages/sign_in.tsx
import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField, Typography, Stack } from '@mui/material';
// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
// ライブラリ 'react-hook-form'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// * global stateを本コンポーネント内で取得及び更新できるようにする
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const router = useRouter();
  // * サインインするために送信ボタンを押したときの通信の状態を管理
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  // * ライブラリ 'react-hook-form' から下記の変数が自動生成される
  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  });

  // 送信前のバリデーションのルール
  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください。',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください。',
    },
  };

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    setIsLoading(true); // * ローディング開始
    console.log('data :>> ', data); // {email: 'test1@example.com', password: 'password'}
    // NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in';
    const headers = { 'Content-Type': 'application/json' };

    // * useSWR は、GETリクエストによるデータフェッチを行う場面で利用できるものであり、POSTリクエストの場合はうまく機能しないので、axios を用いて自力でのリクエスト処理実装が必要
    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        console.log('res :>> ', res);
        // res: {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…},...}
        // res.headers: { 'access-token': '0M884GmHPokwik3m2ByRYg', ..., 'client': 'pk8F5E5FOt5WMHKdixrQcw', 'content-type': 'application/json; charset=utf-8', 'uid': 'test1@example.com' }
        localStorage.setItem('access-token', res.headers['access-token']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('uid', res.headers['uid']);
        // * サインイン時にglobal stateのユーザー情報を更新(isFetched: false) => CurrentUserFetch.tsxが走り、
        // * サインイン後の home画面に戻ったときに 右上の headerの表示が切り替わるようになる
        setUser({
          ...user,
          isFetched: false,
        });
        // * 通知バーの状態を更新する
        setSnackbar({
          message: 'サインインに成功しました',
          severity: 'success',
          pathname: '/',
        });
        router.push('/');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
        // * 通知バーの状態を更新する
        setSnackbar({
          message: '登録ユーザーが見つかりません',
          severity: 'error',
          pathname: '/sign_in',
        });
        // データ通信がうまくいかなかった場合、再度ボタンを押せる状態に戻すようにしている
        setIsLoading(false); // * ローディング完了
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign in
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name="email"
            control={control}
            // * Controllerタグのrulesにバリデーションルールを適用する
            rules={validationRules.email}
            //  render={({ field }) => (
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="メールアドレス"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            // * Controllerタグのrulesにバリデーションルールを適用する
            rules={validationRules.password}
            //  render={({ field }) => (
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          {/* <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </Button> */}
          {/* //* ローディング中に表示させるコンポーネント from @mui/lab */}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;
