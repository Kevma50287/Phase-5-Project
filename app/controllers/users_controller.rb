class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[ show create login ]

  # GET /users/1 - Shows only basic user information
  def show
    render json: @user
  end

  # GET /profile - Shows all the users information
  def profile
    @user_id = decode_token
    if @user_id
      @user = User.find_by!(id: @user_id)
      render json: @user
    else 
      render json: {error: "401 incorrect token"}, status: 401
    end
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    @token = generate_token(@user.id)
    render json: {user: UserSerializer.new(@user).serializable_hash, jwt:@token}, status: :created
  end

  # PATCH/PUT /users/1
  def update
    if current_user.update!(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    #User can delete account
    current_user.destroy
    head :no_content
  end

  # Cookies Login, Logout

  def login
    @user = User.find_by!(username: params[:username])
    if @user&.authenticate(params[:password])
      @token = generate_token(@user.id)
      render json: {user: UserSerializer.new(@user).serializable_hash, jwt:@token}, status: :created
    else
      render json:{error: "Incorrect username or password"}, status: :unauthorized
    end
  end

  def logout
    cookies.delete :current_user_id
    head :no_content
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :sex, :age, :city, :lat, :lng, {:preferences => []}, :avatar, :state, :location)
    end
end
