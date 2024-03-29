#!/bin/bash
set -e # スクリプトが途中でエラーを検出した場合に終了するように設定します。

# 開始メッセージを表示します。
echo "Start entrypoint.prod.sh"

# 古いPumaサーバのPIDファイルを削除します。これにより、サーバが前回の終了後に正常に再起動できるようになります。
echo "rm -f /myapp/tmp/pids/server.pid"
rm -f /myapp/tmp/pids/server.pid

# 本番環境用のデータベースを作成します。すでに存在する場合は何もしません。
echo "bundle exec rails db:create RAILS_ENV=production"
bundle exec rails db:create RAILS_ENV=production

# 本番環境用のデータベースに対してマイグレーションを実行します。
echo "bundle exec rails db:migrate RAILS_ENV=production"
bundle exec rails db:migrate RAILS_ENV=production

# データベースに初期データを投入します。
echo "bundle exec rails db:seed RAILS_ENV=production"
bundle exec rails db:seed RAILS_ENV=production

# Pumaサーバを起動します。
echo "exec pumactl start"
bundle exec pumactl start
