class ClientsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    clients = Client.all
    render json: clients
  end

  def show  
    client = Client.find(params[:id])
    render json: client
  end
  
  def create
    client = Client.create!(client_params)
    session[:client_id] = client.id
    render json: client, status: :created
  end

  def update
    client = Client.find(params[:id])
    client.update!(client_params)
    render json: client, status: :accepted
  end

  def destroy
    client = Client.find(params[:id])
    client.destroy
    head :no_content
  end

  def me
    user = Client.find_by(id: session[:client_id])
    if user
      render json: user
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  def myappointments
    user = Client.find_by(id: session[:client_id])
    if user
      render json: user.appointments
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  private
  def client_params
    params.permit(:name, :email, :password)
  end
  
    
end
