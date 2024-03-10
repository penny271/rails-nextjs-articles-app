# rails/app/controllers/api/v1/current/articles_controller.rb

# class Api::V1::Current::ArticlesController < ApplicationController
# end

class Api::V1::Current::ArticlesController < Api::V1::BaseController
  # 認証済みユーザーからのリクエストのみを受け付けるようにしている
  before_action :authenticate_user!

  # 認証ユーザーの下書きarticle取得 or 新規作成
  def create
    # current_user.articles.unsaved.first は enumの書き方
    unsaved_article = current_user.articles.unsaved.first || current_user.articles.create!(status: :unsaved)
    render json: unsaved_article
  end

  def update
    article = current_user.articles.find(params[:id])
    article.update!(article_params)
    render json: article
  end

  private

    def article_params
      params.require(:article).permit(:id, :title, :content, :status)
    end
end
