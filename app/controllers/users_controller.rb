class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[ show create login ]

  # GET /users/1 - Shows only basic user information
  def show
    render json: @user
  end

  # GET /profile - Shows all the users information
  def profile
    render json: @current_user
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    cookies.encrypted[:current_user_id] = {value: @user.id, expires:7.days}
    render json: @user, status: :created
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    #User can delete account
    @current_user.destroy
    head :no_content
  end

  # Cookies Login, Logout

  def login
    @user = User.find_by!(username: params[:username])
    # binding.break
    if user&.authenticate(params[:password])
      cookies.encrypted[:current_user_id] = {value: @user.id, expires:7.days}
      render json: user, status: :created
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
      params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :sex, :age, :city, :lat, :lng, {:preferences => []}, :avatar)
    end
end
