# rails/app/controllers/application_controller.rb

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Rails7以降では、APIモードの際にSessionへのアクセスがあると、ActionDispatch::Request::Session::DisabledSessionErrorが発生 を回避するコード
  include DeviseHackFakeSession

  # :devise_contoller?とはdeviseを生成した際にできるヘルパーメソッドの一つで、deviseにまつわる画面に行った時に、という意味がある。こうすることで全ての画面でconfigure_permitted_parametersが起動する。
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    # configure_permitted_parametersと内の記述は、デバイス版のストロングパラメーターのこと
    # デバイスでは初期設定でメールアドレスとパスワードしか許されていない。
    # ここを編集することでユーザーネームなどを入れることができる / 今回の例だと nameカラムへの保存を許可する
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      # devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :confirm_success_url])
    end
end
