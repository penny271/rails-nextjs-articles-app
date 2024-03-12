FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y vim

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler

RUN bundle install
COPY . /myapp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# ocker Composeを使用する場合、通常イメージはDockerfileの指示に従って一度ビルドされ、その後変更がない限り再利用されます。Dockerfileやイメージにコピーされるファイルを変更した場合、Docker Composeはイメージを再構築し、すべてのRUNコマンドとCOPYコマンドを再実行します。変更がない場合、Docker Composeは既存のイメージを使用するため、これらのコマンドは再実行されません。

# - ただし、ENTRYPOINTスクリプトは、ビルドプロセス中ではなく、コンテナが起動されるたびに実行されます。