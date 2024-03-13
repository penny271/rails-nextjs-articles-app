// next/src/components/Snackbar.tsx

import { Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSnackbarState } from '@/hooks/useGlobalState';

const SuccessSnackbar = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useSnackbarState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // snackbar.pathnameとして与えた文字列と、アクセスしている画面のパス（router.pathname）が一致している場合のみ、通知バーの表示・非表示を決定しているローカルステートopenを false から true に切り替え、通知バーの表示を実現している
    if (snackbar.pathname == router.pathname) {
      setOpen(true);
    }
  }, [snackbar, router]);

  // 自動でバナーが消える際もこの関数が呼ばれ、状態をresetする
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    // * reason === 'clickaway'のif文を入れることで、通知バーが表示されている間に通知バー以外の箇所をクリックしても、通知バーが閉じないようにしている
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSnackbar({ message: null, severity: null, pathname: null });
  };

  console.log('snackbar :>> ', snackbar);

  return (
    <>
      {snackbar.severity != null && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SuccessSnackbar;
