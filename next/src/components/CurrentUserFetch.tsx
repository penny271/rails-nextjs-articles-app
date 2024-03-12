// next/src/components/CurrentUserFetch.tsx
// * 前提として、このコンポーネントは全てのページで読み込まれ、ユーザーの情報を取得する

// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useEffect } from 'react';
import { useUserState } from '@/hooks/useGlobalState';

const CurrentUserFetch = () => {
  // next/src/hooks/useGlobalState.ts の global state管理より
  const [user, setUser] = useUserState();

  useEffect(() => {
    // データフェッチがすでに完了していることを表しており、その状態で無駄にデータフェッチを繰り返すことを防ぐ
    if (user.isFetched) {
      return;
    }

    if (localStorage.getItem('access-token')) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user';
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res: AxiosResponse) => {
          setUser({
            ...user,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          });
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message);
          setUser({
            ...user,
            isFetched: true,
          });
        });
    } else {
      setUser({
        ...user,
        isFetched: true,
      });
    }
  }, [user, setUser]);

  return <></>;
};

export default CurrentUserFetch;
