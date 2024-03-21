# rails/app/controllers/api/v1/confirmations_controller.rb

class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    # confirmation.tsxから受け取ったconfirmation_tokenのvalueがレコードに存在するかを確認し取得する
    user = User.find_by(confirmation_token: params[:confirmation_token])
    return render json: { message: "ユーザーが見つかりません。" }, status: :not_found if user.nil?
    # confirmed?メソッド(deviseが付与している)は、ユーザーがすでにアカウントを確認している場合（confirmed_atフィールドにタイムスタンプがある場合）にはtrueを返し、アカウントのメールアドレスが確認されたことを示す
    return render json: { message: "すでにそのユーザーは認証されています。" }, status: :bad_request if user.confirmed?

    user.update!(confirmed_at: Time.current)

    render json: { message: "User confirmartion succeeded." }, status: :ok
  end
end
