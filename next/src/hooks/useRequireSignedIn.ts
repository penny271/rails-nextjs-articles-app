// next/src/hooks/useRequireSignedIn.ts

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';

// 本フック関数を Next ページコンポーネント内で呼び出すことによって、「サインイン状態でのみアクセスできるページ」を実現する
export function useRequireSignedIn() {
  const router = useRouter();
  const [user] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      setSnackbar({
        message: 'サインインしてください',
        severity: 'error',
        pathname: '/sign_in',
      });
      router.push('/sign_in');
    }
  }, [user, router, setSnackbar]);
}
