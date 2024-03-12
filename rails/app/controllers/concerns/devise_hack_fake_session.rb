# rails/app/controllers/concerns/devise_hack_fake_session.rb

# Rails7以降では、APIモードの際にSessionへのアクセスがあると、ActionDispatch::Request::Session::DisabledSessionErrorが発生します。

# APIモードではSessionアクセスを想定していないためですが、deviseの中でSessionを触ってしまう部分あるためにこのエラーが発生してしまいます。したがって、deviseからSessionへのアクセスをうまく回避するような設定を行う必要があります。

module DeviseHackFakeSession
  extend ActiveSupport::Concern

  class FakeSession < Hash
    def enabled?
      false
    end

    def destroy
    end
  end

  included do
    before_action :set_fake_session

    private

      def set_fake_session
        if Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only
          request.env["rack.session"] ||= ::DeviseHackFakeSession::FakeSession.new
        end
      end
  end
end
