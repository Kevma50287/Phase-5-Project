class ParticipationsController < ApplicationController
  # POST /participations
  def create
    @participation = Participation.create!(participation_params)
    render json: @participation, status: :created
  end

  # DELETE /participations/1/1
  def destroy
    @participation = Participation.find_by!(user_id:params[:user_id], event_id:params[:event_id])
    @participation.destroy
    head :no_content
  end

  private

    # Only allow a list of trusted parameters through.
    def participation_params
      params.require(:participation).permit(:event_id, :user_id)
    end
end
