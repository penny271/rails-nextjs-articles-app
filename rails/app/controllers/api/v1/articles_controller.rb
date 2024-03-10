# rails/app/controllers/api/v1/articles_controller.rb

class Api::V1::ArticlesController < Api::V1::BaseController
  include Pagination

  def index
    # articles = Article.published.order(created_at: :desc).page(params[:page] || 1).per(10)
    # * N + 1問題を解消
    articles = Article.published.order(created_at: :desc).page(params[:page] || 1).per(10).includes(:user)
    # render json: articles
    # * meta: pagination(articles)で、ページ情報をレスポンスのメタ情報として仕込み、さらにadapter: :jsonでメタ情報をレスポンス json に統合しています。
    # => 現在のページ数・全体のページ数をjsonに統合している
    render json: articles, meta: pagination(articles), adapter: :json
  end

  def show
    # * Article.where(status: "published")と同じ。
    # * enumの機能でこのような書き方ができる
    article = Article.published.find(params[:id])
    # *  serializer の指定を行わない場合は、モデルと同名の serializer （今回の場合はArticleSerializer）が自動的に参照されるルールになっているため省略しています。
    render json: article
  end
end
