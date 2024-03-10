# rails/app/serializers/article_serializer.rb

# class ArticleSerializer < ActiveModel::Serializer
#   attributes :id
# end

class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status, :created_at, :from_today
  # * UserSerializer を ArticleSerializer の方で呼び出す記述を追加
  # * userもリクエストの結果に含まれる
  belongs_to :user, serializer: UserSerializer

  # * enum_help gemで status_i18nというメソッドが利用できるようになっており、これがrails/config/locales/ja.ymlで定義した日本語翻訳を返す
  def status
    # object.status    # published と表示される
    object.status_i18n # 公開済み と表示される
  end

  # * serializer内でobjectを呼び出すと、レスポンスされるレコード自身が呼び出されます。つまり、object.created_atは、article.created_atと読み替えることができます。
  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end

  def from_today # rubocop:disable Metrics/AbcSize
    now = Time.zone.now
    created_at = object.created_at

    months = (now.year - created_at.year) * 12 + now.month - created_at.month - ((now.day >= created_at.day) ? 0 : 1)
    years = months.div(12)

    return "#{years}年前" if years > 0
    return "#{months}ヶ月前" if months > 0

    seconds = (Time.zone.now - object.created_at).round

    days = seconds / (60 * 60 * 24)
    return "#{days}日前" if days.positive?

    hours = seconds / (60 * 60)
    return "#{hours}時間前" if hours.positive?

    minutes = seconds / 60
    return "#{minutes}分前" if minutes.positive?

    "#{seconds}秒前"
  end
end
