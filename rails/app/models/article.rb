# rails/app/models/article.rb

# * enum補足
# enumで定義されたメソッド： enum :status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true 行は、ステータス属性の列挙型を定義します。これにより、unsaved?、draft?、published?のようなメソッドが作成されます。

class Article < ApplicationRecord
  belongs_to :user
  enum :status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true
  # * enumを使った場合、プロパティ名を飛ばして、そこに紐づけた定数名で直接アクセスできるため、 published? が可能 - statusの値が 30 なら true そうでないなら falseを返す
  validates :title, :content, presence: true, if: :published?
  # validates :title, :content, presence: true, if: :status_published?  <= _prefixがなぜか効かない
  validate :verify_only_one_unsaved_status_is_allowed

  private

    # 現在の投稿が unsaved かつ そのユーザーの持っている他の投稿で unsavedが存在する場合
    def verify_only_one_unsaved_status_is_allowed
      if unsaved? && user.articles.unsaved.present?
        raise StandardError, "未保存の記事は複数保有できません"
      end
    end

  # * altarnative コード update時
  # def verify_only_one_unsaved_status_is_allowed
  #   return unless unsaved?

  #   # Exclude the current article from the check
  #   if user.articles.where(status: :unsaved).excluding(self).exists?
  #     raise StandardError, "未保存の記事は複数保有できません"
  #   end
  # end
end
