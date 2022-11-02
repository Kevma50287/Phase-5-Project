class EventsController < ApplicationController
  before_action :set_event, only: %i[ show update destroy ]
  skip_before_action :authorize, only: %i[ index show]

  # GET /events
  def index
    @events = Event.all

    render json: @events
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    @event = Event.create!(event_params)
    Participation.create!({
      event_id:@event.id,
      user_id:decode_token
    })
    render json: @event, status: :created
  end

  # PATCH/PUT /events/1
  def update
    @event.update!(event_params)
    render json: @event
  end

  # DELETE /events/1
  def destroy
    @event.destroy
    render json: @event
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:id, :title, :location, :city, :state, :lat, :lng, :party_size, :what, :when, :why, :user_id, :image_url, :tags => [])
    end
end
