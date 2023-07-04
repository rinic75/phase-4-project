class SessionsController < ApplicationController
  def login
    user = Client.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:client_id] = user.id
      render json: user, status: :ok
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end
  def logout
    session.delete :client_id
    head :no_content
  end
end
