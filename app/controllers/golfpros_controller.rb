class GolfprosController < ApplicationController
  def index 
    golfpros = Golfpro.all
    render json: golfpros
  end
  def show
    golfpro = Golfpro.find(params[:id])
    render json: golfpro
  end
end
