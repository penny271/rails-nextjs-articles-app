## Next.js起動（開発）
`npm run dev`

## Next.js起動先url（開発）
### (Next.jsの開発サーバーはデフォルトでは3000番ポートを使用します(localhost:3000)。ただし今回は、docker-compose.ymlで、ホストの8000番ポートとnextコンテナの3000番ポートを接続しているため、ホスト側からは8000番ポート(localhost:8000)でアクセスができます。)
`http://localhost:8000/`

## ESlintとPrettier、およびそれらの関連ライブラリをインストールします。下記コマンドをnextコンテナで実行してください。※依存関係でエラーが起きたら  --legacy-peer-deps を語尾につける
`npm install --save-dev prettier eslint eslint-config-next typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import`