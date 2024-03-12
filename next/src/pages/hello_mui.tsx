// next/src/pages/hello_mui.tsx

// {css} に関して、どちらからimportしても問題なし
import { css } from '@emotion/react';
// import { Button, css } from '@mui/material';
import { Button } from '@mui/material';
import type { NextPage } from 'next';

css;

const buttonCss = css({
  padding: '24px',
});

const HelloMui: NextPage = () => {
  return (
    <>
      <Button>Hello Mui@v5!</Button>
      <Button variant="contained" css={buttonCss}>
        Hello Mui@v5!
      </Button>
      <Button variant="outlined" css={buttonCss}>
        Hello Mui@v5!
      </Button>
      <Button variant="contained" color="error" css={buttonCss}>
        Hello Mui@v5!
      </Button>
      <Button
        variant="contained"
        sx={{
          p: 6,
          ml: 2,
          mt: 3,
          color: { xs: 'white', md: 'red' },
          textTransform: 'none',
        }}
      >
        Hello Mui@v5!
      </Button>
    </>
  );
};

export default HelloMui;
