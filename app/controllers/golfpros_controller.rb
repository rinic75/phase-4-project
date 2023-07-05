class GolfprosController < ApplicationController
  def index 
    golfpros = Golfpro.all
    render json: golfpros
  end
  def show
    golfpro = Golfpro.find(params[:id])
    render json: golfpro
  end
  def create 
    golfpro = Golfpro.create!(golfpro_params)
    render json: golfpro, status: :created
  end
  def destroy
    golfpro = Golfpro.find(params[:id])
    golfpro.destroy
    head :no_content
  end

  private
  def golfpro_params
    params.permit(:name, :email, :bio)
  end
end
