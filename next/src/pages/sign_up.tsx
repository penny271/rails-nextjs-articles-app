// next/src/pages/sign_up.tsx

import { LoadingButton } from '@mui/lab';
import { Box, Container, TextField, Typography, Stack } from '@mui/material';
// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

interface ApiError {
  full_messages?: string[]; // Array of error strings
  [key: string]: unknown; // This allows the object to have other properties dynamically
}

interface ErrorResponse {
  errors: ApiError; // Ensure this matches your expected API structure
}

const SignUp: NextPage = () => {
  const router = useRouter();
  const [, setSnackbar] = useSnackbarState();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { email: '', password: '' },
  });

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
    name: {
      required: 'ユーザー名を入力してください。',
    },
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth';
      const headers = { 'Content-Type': 'application/json' };
      // * .env.developmentで定義したフロントエンドのベースURLは、サインアップリクエストのボディーパラメーターとして
      // * confirm_success_url（認証に成功した場合のリダイレクト先のURL）を渡すために使用
      // * 必ずキーの名前はconfirm_success_urlとしなければならない deviseはその名前で探すため
      const confirmSuccessUrl =
        process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in';

      const combined_data = { ...data, confirm_success_url: confirmSuccessUrl };
      console.log('combined_data :>> ', combined_data);

      await axios({
        method: 'POST',
        url: url,
        // data: { ...data, confirm_success_url: confirmSuccessUrl },
        data: combined_data,
        headers: headers,
      })
        .then((res: AxiosResponse) => {
          localStorage.setItem(
            'access-token',
            res.headers['access-token'] || '',
          );
          localStorage.setItem('client', res.headers['client'] || '');
          localStorage.setItem('uid', res.headers['uid'] || '');
          setSnackbar({
            message: '認証メールをご確認ください',
            severity: 'success',
            pathname: '/',
          });
          router.push('/');
        })
        // .catch((e: AxiosError<{ error: string }>) => {
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(e.message);

          // Check for the specific error regarding password length
          if (
            e.response &&
            e.response.data.errors &&
            e.response.data.errors?.full_messages?.includes(
              'パスワードは6文字以上で入力してください',
            )
          ) {
            setSnackbar({
              message: 'パスワードは6文字以上で入力してください',
              severity: 'error',
              pathname: '/sign_up',
            });
          } else {
            // Fallback error message
            setSnackbar({
              message: '不正なユーザー情報です',
              severity: 'error',
              pathname: '/sign_up',
            });
          }
          setIsLoading(false);
        });
    };
    SignUp(data);
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#EDF2F7',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign Up
          </Typography>
        </Box>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
        >
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
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
            rules={validationRules.password}
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
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="ユーザー名"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
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

export default SignUp;
