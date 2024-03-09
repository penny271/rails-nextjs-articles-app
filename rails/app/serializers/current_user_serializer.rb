# rails/app/serializers/current_user_serializer.rb

# * active_model_serializersを導入することで、レスポンスに含める情報を「シリアライザーファイル」で制御できるようになります。

# class CurrentUserSerializer < ActiveModel::Serializer
#   attributes :id
# end

# レスポンスするレコードのうち、どのカラムの情報をレスポンスボディーに含めるかを定義
class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
end

