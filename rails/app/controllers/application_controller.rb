class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Rails7以降では、APIモードの際にSessionへのアクセスがあると、ActionDispatch::Request::Session::DisabledSessionErrorが発生 を回避するコード
  include DeviseHackFakeSession
end
