# rails/spec/factories/users.rb

# * このファイルの目的は、テスト中にユーザーモデルのテストデータを
# * 生成する便利な方法を提供し、生成すること

FactoryBot.define do
  factory :user do
    # name { "田中太郎" }
    # * emailだけ書き方を異なっているのは、Userモデルにおけるemailカラムの
    # * ユニーク制約（複数のレコードで同じ値を持つことができない）を考慮しているため
    # sequence(:email) {|n| "#{n}_" + "test@example.com" }
    # password { "password" }
    # confirmed_at { Time.current }
    # * gem Fakerを使用
    name { Faker::Name.name }
    sequence(:email) {|n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 10) }
    confirmed_at { Time.current }
  end
end

# 生成されるemailの例:
# 1_test@example.com
# 2_test@example.com
# 3_test@example.com
