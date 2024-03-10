# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # * rails/app/models/user.rb: :cofirmable を有効にします。 :confimrmableを有効にすると、ユーザー新規登録の際に何らかの認証操作が必須となります。今回はメール認証を行います。
  devise :database_authenticatable, :registerable,
         #  :recoverable, :rememberable, :validatable
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # 親レコードである users 側が削除された場合に、子レコードである articles も一緒に削除する
  has_many :articles, dependent: :destroy
end
