# rails/app/controllers/api/v1/base_controller.rb
# * deviseの便利なメソッドをそのまま使おうとすると 下記のように長ったらしくなるため、
# * メソッド名のエイリアスを作成する
# current_api_v1_user
# authenticate_api_v1_user!
# api_v1_user_signed_in?

class Api::V1::BaseController < ApplicationController
  alias_method :current_user, :current_api_v1_user
  alias_method :authenticate_user!, :authenticate_api_v1_user!
  alias_method :user_signed_in?, :api_v1_user_signed_in?
end