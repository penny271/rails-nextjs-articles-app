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

      # サインインユーザーの情報を取得するアクションを実装
      # CurrentUsersControllerを実装
      namespace :current do
        resource :user, only: [:show]
        # resources :articles, only: [:create]
        resources :articles, only: [:create, :update]
      end
      # 記事の詳細を取得するアクション
      resources :articles, only: [:index, :show]
    end
  end

  # Defines the root path route ("/")
  # root "articles#index"
end
