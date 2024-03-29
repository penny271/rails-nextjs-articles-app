# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins "example.com"
#
#     resource "*",
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins "http://localhost:8000"
    # * gem configで定義したドメイン使用
    origins Settings.front_domain

    resource "*",
             headers: :any,
             # * 認証情報（'access-token', 'uid','client'）を Next.js で取得できるようにする
             # * Next.js側で サインイン機能を実装するために必要
             expose: ["access-token", "uid", "client"],
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
