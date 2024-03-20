// next/src/components/MarkdownText.tsx

import { Box } from '@mui/material';
import { marked } from 'marked';
import 'zenn-content-css';

type MarkdownTextProps = {
  content: string;
};

const MarkdownText = (props: MarkdownTextProps) => {
  return (
    <Box
      // * zenn-content-cssを適用
      className="znc"
      // { fontWeight: 'bold' } が <Box> 内に含まれるすべての <h1>, <h2>, <h3> 要素に適用されています。
      sx={{
        h1: { fontWeight: 'bold' },
        h2: { fontWeight: 'bold' },
        h3: { fontWeight: 'bold' },
      }}
    >
      {/* //* markdownテキストをHTMLに展開するのは、以下の構文が該当 */}
      <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
    </Box>
  );
};

export default MarkdownText;
