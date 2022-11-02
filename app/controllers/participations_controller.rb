class ParticipationsController < ApplicationController
  before_action :set_participation, only: %i[ show destroy ]

  # GET /participations
  def index
    @participations = Participation.all

    render json: @participations
  end

  # GET /participations/1
  def show
    render json: @participation
  end

  # POST /participations
  def create
    @participation = Participation.create!(participation_params)
    render json: @participation, status: :created, location: @participation
  end

  # DELETE /participations/1
  def destroy
    @participation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_participation
      @participation = Participation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def participation_params
      params.require(:participation).permit(:event_id, :user_id)
    end
end
