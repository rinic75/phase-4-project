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
    client = Client.find_by(id: session[:client_id])
    appointment = client.appointments.create!(appointment_params)
    render json: appointment, status: :created
  end

  def update
    appointment = Appointment.find(params[:id])

    if appointment.client_id == session[:client_id]
      appointment.update!(appointment_params)
      render json: appointment, status: :accepted
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def destroy
    appointment = Appointment.find(params[:id])

    if appointment.client_id == session[:client_id]
      appointment.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def appointment_params
    params.permit(:client_id, :golfpro_id, :time, :lesson_info)
  end
end