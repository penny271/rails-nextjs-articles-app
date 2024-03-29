# rails/app/controllers/api/v1/health_check_controller.rb
class Api::V1::HealthCheckController < ApplicationController
  def index
    # binding.pry
    render json: { message: "Success Health Check!!" }, status: :ok
  end
end
