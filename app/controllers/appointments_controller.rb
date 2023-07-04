class AppointmentsController < ApplicationController
  def index
    appointments = Appointment.all
    render json: appointments
  end
  def show
    appointment = Appointment.find(params[:id])
    render json: appointment
  end
  def create
    appointment = Appointment.create!(appointment_params)
    render json: appointment, status: :created
  end
  def update
    appointment = Appointment.find(params[:id])
    appointment.update!(appointment_params)
    render json: appointment, status: :accepted
  end
  def destroy
    appointment = Appointment.find(params[:id])
    appointment.destroy
    head :no_content
  end

  private
  def appointment_params
    params.permit(:client_id, :golfpro_id, :time, :lesson_info)
  end
end
