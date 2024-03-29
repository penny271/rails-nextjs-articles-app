# 環境変数からRAILS_MAX_THREADSを取得し、設定されていない場合は
# デフォルト値5を使用し、整数に変換してthreads_countに代入します。
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i

# Pumaの最小スレッド数と最大スレッド数をthreads_countで設定します。
threads threads_count, threads_count

# 環境変数からRAILS_ENVを取得し、設定されていない場合は'development'を使用します。
environment ENV.fetch("RAILS_ENV") { "development" }

# Pumaサーバが再起動する際に、tmpディレクトリ内のファイルをチェックすることで、アプリの再起動をトリガーとします。
plugin :tmp_restart

# アプリケーションのルートディレクトリへの絶対パスをapp_rootに設定します。
app_root = File.expand_path("..", __dir__)

# Pumaサーバが使用するソケットの場所を設定します。これはUNIXドメインソケットを使用します。
bind "unix://#{app_root}/tmp/sockets/puma.sock"
