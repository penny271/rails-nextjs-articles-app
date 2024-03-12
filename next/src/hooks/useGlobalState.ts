// next/src/hooks/useGlobalState.ts
// * global stateの管理 (ユーザーのログイン状態)

import useSWR from 'swr';

export const useUserState = () => {
  type userStateType = {
    id: number;
    name: string;
    email: string;
    isSignedIn: boolean;
    isFetched: boolean;
  };

  const fallbackData: userStateType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  };

  // * useSWRはいくつかの引数を受け取る。この場合、第一引数の'user'は、フェッチャー関数やデータに関連付けられたキーである。
  // * 2番目の引数はnullで、フェッチャー関数が提供されていないことを示し、SWRはそれ自体でリモート・データ・フェッチを実行すべきではないことを示す。
  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  });
  return [state, setState] as [userStateType, (value: userStateType) => void];
};
