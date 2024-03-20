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

// Imageコンポーネントをでは、public配下の画像ファイルを参照して<img>タグとして展開
import Image from 'next/image';
import Link from 'next/link';
// * global stateを本コンポーネント内で取得及び更新できるようにする
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserState } from '@/hooks/useGlobalState';

const Header = () => {
  const router = useRouter();
  const [user] = useUserState();
  // メニューの中身を表示させる位置を決定する
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // メニューの開閉を制御
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
