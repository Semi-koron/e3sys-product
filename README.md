# DEC e3sys team phase4 product

## はじめに

こちらのプロジェクトをまずは起動してみましょう

1. .env ファイルをコピーして自分の環境に貼り付けてください。
   `backend/.env`
   **注意** 必ず . が付いているか確認すること。
2. frontend ディレクトリに移動して、次のコードを実行してください。

```
    npm install
```

3. docker desktop を起動してください。
4. ディレクトリの一番上で以下のコマンドを実行してください。
   `docker compose up --build`
5. バックエンドが動いている docker のコンテナに接続するコマンドを実行します。
   `docker exec -it e3sys-product-backend-1 bash`
6. composer で依存パッケージをインストールします。
   `composer install`
7. storage に対するアクセス権限を与えます
   `chmod -R 777 storage`
8. マイグレーションを実行する
   `php artisan migrate`
9. コンテナから離れます
   `exit`
10. 以下のポート番号を参考にしてそれぞれ開発に励んでください。
   `localhost:{ポート番号}`にアクセスすることでそれぞれのページに飛ぶことができます。

### フロントエンド関連のポート
/frontendで`npm run dev`を実行後
`3000:next.jsのトップページ`

### バックエンド関連のポート番号

`8080:laravel(api)のエンドポイント`
`8081:phpMyAdmin`

## 気を付ける事

- 分からなかったら連絡をすること!
- 無理のない範囲で頑張るように!

## コミットメッセージの規則について

- 以下の記事に従って先頭に接頭辞をつける
- https://qiita.com/muranakar/items/20a7927ffa63a5ca226a
- またコミットメッセージはスネークケースを使う
- 英語が好ましいが、どうしてもというときは日本語を使ってもよい

```
    {接頭辞} {内容}
```

例:モーダルウインドウの css を変更した際

```
    improve modal_window_css
```

## ブランチ名の命名規則について

基本的に issue を立ててからブランチをきる
ブランチの名前のテンプレートとして以下を利用する

```
    {接頭辞}/#{issue番号}_{内容}
```

例:issue がモーダルウィンドウの作成で issue 番号が 6 だった場合

```
    feat/#6_create_modalwindow
```
