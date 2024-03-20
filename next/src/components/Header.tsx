/* eslint-disable react/jsx-no-undef */
// next/src/components/Header.tsx
// Importing necessary icons from MUI
import ArticleIcon from '@mui/icons-material/Article';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

// import { AppBar, Box, Button, Container } from '@mui/material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosError } from 'axios';

// Imageコンポーネントをでは、public配下の画像ファイルを参照して<img>タグとして展開
import Image from 'next/image';
import Link from 'next/link';
// * global stateを本コンポーネント内で取得及び更新できるようにする
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserState } from '@/hooks/useGlobalState';

const Header = () => {
  const [user] = useUserState();
  // メニューの中身を表示させる位置を決定する
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // メニューの開閉を制御
  const open = Boolean(anchorEl);
  const router = useRouter();

  console.log('router :>> ', router);
  // router :>>  {pathname: '/current/articles/edit/[id]', route: '/current/articles/edit/[id]', query: {…}, asPath: '/current/articles/edit/32', components: {…},…}

  // 記事編集ページでは、ヘッダーが表示されないようにしている
  // ※current/articles/edit/[id]ページのbarがfixedなので実装しても見栄えは変わらない直が要素は消える
  const hideHeaderPathnames = ['/current/articles/edit/[id]'];
  if (hideHeaderPathnames.includes(router.pathname)) {
    console.log('hideHeaderPathnames :>> ', hideHeaderPathnames);
    console.log('router.pathname :>> ', router.pathname);
    return <></>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 新しい記事を作成 => 記事編集ページに飛びそこで編集(新規作成)可能
  // 新規作成画面、更新画面を同じパスで共通化し、シームレスな保存処理を実現している
  const addNewArticle = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles';

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };

    axios({ method: 'POST', url: url, headers: headers })
      .then((res: AxiosResponse) => {
        router.push('/current/articles/edit/' + res.data.id);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
      });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: 1,
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link href="/">
              <Image src="/logo.png" width={133} height={40} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontSize: 16,
                      borderRadius: 2,
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      router.push('/sign_in');
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontSize: 16,
                      lineHeight: '27px',
                      borderRadius: 2,
                      boxShadow: 'none',
                      border: '1.5px solid #3EA8FF',
                      ml: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
              {user.isSignedIn && (
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                  <Box sx={{ ml: 2 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 2,
                        width: 100,
                        boxShadow: 'none',
                      }}
                      onClick={addNewArticle}
                    >
                      Add new
                    </Button>
                  </Box>
                  <Menu
                    // モーダルをどのHTML要素付近に表示させるかを決定
                    anchorEl={anchorEl}
                    id="account-menu"
                    // モーダルの開閉を決定します。trueなら開き、falseなら閉じる
                    open={open}
                    // Material-UIが提供: onClose（モーダル外の任意の場所をクリック）、onClick（モーダル内の任意の場所をクリック）イベントにはhandleCloseが設置されており、モーダル閉じる仕組みを設定
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ pl: 2, py: 1 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <Link href="/current/articles">
                      <MenuItem>
                        <ListItemIcon>
                          <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        記事の管理
                      </MenuItem>
                    </Link>
                    <Link href="/sign_out">
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        サインアウト
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
