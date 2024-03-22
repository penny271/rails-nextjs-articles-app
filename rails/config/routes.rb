# rails/config/routes.rb

Rails.application.routes.draw do
  # * letter_opener_web 用のルーティング メール認証
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # mount_devise_token_auth_for "User", at: "auth"
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      # ターミナルでdeviseインストールと一緒に追加された User に対するルーティングを適切な定義（api/v1配下）に直す(移動した)
      mount_devise_token_auth_for "User", at: "auth"
      # The sign-up route would be /api/v1/auth/sign_up
      # The sign-in route would be /api/v1/auth/sign_in
      # The sign-out route would be /api/v1/auth/sign_out
      # Other related routes for account confirmation, password recovery, etc., would also be nested under /api/v1/auth
      # user情報を更新する - created_atに日時を入れる(サインアップ時)
      namespace :user do
        resource :confirmations, only: [:update]
      end
      # サインインユーザーの情報を取得するアクションを実装
      # CurrentUsersControllerを実装
      namespace :current do
        resource :user, only: [:show, :update]
        # resources :articles, only: [:index, :create, :update]
        resources :articles, only: [:index, :show, :create, :update]
      end
      # 記事の詳細を取得するアクション
      resources :articles, only: [:index, :show]
    end
  end

  # Defines the root path route ("/")
  # root "articles#index"
end
