## Next.js起動（開発）
`npm run dev`

## Next.js起動先url（開発）
### (Next.jsの開発サーバーはデフォルトでは3000番ポートを使用します(localhost:3000)。ただし今回は、docker-compose.ymlで、ホストの8000番ポートとnextコンテナの3000番ポートを接続しているため、ホスト側からは8000番ポート(localhost:8000)でアクセスができます。)
`http://localhost:8000/`

## ESlintとPrettier、およびそれらの関連ライブラリをインストールします。下記コマンドをnextコンテナで実行してください。※依存関係でエラーが起きたら  --legacy-peer-deps を語尾につける (コンテナ内部で行う)
`npm install --save-dev prettier eslint eslint-config-next typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import`

## Material-UI@v5とemotionの導入 (コンテナ内部で行う)
`npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/cache @emotion/server`

## emotionでCSSスタイルを定義できるための設定を行う (コンテナ内部で行う)
`npm install --save-dev @emotion/babel-plugin`
### 公式doc ###
https://mui.com/material-ui/react-button/

## SWR と axios をインストール SWRはRailsからデータを取得する（GETメソッドのリクエスト）/ axios: Railsに対して何らかのデータ変更を命じる（POST, PATHC, DELETEなどのメソッドのリクエスト）
`npm install axios swr`

## Rails API との通信には必須のJSライブラリである camelcaseKeys をインストール
### camelcase-keys は引数に与えた JSON のキー文字列のスネークケースをキャメルケースに変換する関数を提供するJSライブラリです。
`npm install camelcase-keys`

## markdownテキストをHTMLに解釈するライブラリとHTMLに zenn ライクなスタイルを付与できるライブラリをインストール
`npm install marked zenn-content-css`

## react-hook-form のインストール React において簡単にフォーム入力を実装できるライブラリ
`npm install react-hook-form`

## npm install @mui/lab
### 「送信する」ボタンを単なるボタンではなく、ローディングを表現できるボタンに置き換える。apiでrailsと通信中に送信ボタンを続けて押され、不必要なリクエストが送信されてしまう挙動の不安定さをなくすために使用
`npm install @mui/lab`


## abc


## abc


## abc


