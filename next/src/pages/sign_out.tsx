// next/src/pages/sign_out.tsx

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';

const SignOut: NextPage = () => {
  const router = useRouter();
  const [, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    localStorage.clear();
    // globalのユーザーの状態を更新する
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    });
    // globalのサインアウトの状態を更新する
    setSnackbar({
      message: 'サインアウトに成功しました',
      severity: 'success',
      pathname: '/',
    });
    router.push('/');
  }, [router, setSnackbar, setUser]);

  return <></>;
};

export default SignOut;
