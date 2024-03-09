# rails/app/controllers/api/v1/current/users_controller.rb

# class Api::V1::Current::UsersController < ApplicationController
# end

# Api::V1::BaseControllerから deviseのメソッド及びメソッド名のエイリアスを継承
class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    # render json: current_user
    # * serializerで 特定のカラムの情報のみをレスポンスボディーに含めるよう定義している
    render json: current_user, serializer: CurrentUserSerializer
  end
end