class FriendshipsController < ApplicationController

  #Allows users to create friendships with each other or delete friendships

  # POST /friendships
  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: @friendship, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
  end

  private

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.permit(:user_id, :friend_id)
    end
end
