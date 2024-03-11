// next/src/components/Header.tsx

import { AppBar, Box, Button, Container } from '@mui/material';
// Imageコンポーネントをでは、public配下の画像ファイルを参照して<img>タグとして展開
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
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
              {/* <Image src="/logo.png" width={153} height={60} alt="logo" /> */}
            </Link>
          </Box>
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
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontSize: 16,
                borderRadius: 2,
                boxShadow: 'none',
                border: '1.5px solid #3EA8FF',
                ml: 2,
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
