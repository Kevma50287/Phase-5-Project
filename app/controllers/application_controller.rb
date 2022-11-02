class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from JWT::DecodeError, with: :render_token_error

  SECRET_KEY = Rails.application.credentials.secret_key_base

  def generate_token(user_id)
    JWT.encode({user_id:user_id}, SECRET_KEY)
  end

  # in order to get decoded token u need a request that has aurhotization header token 
  def auth_header
    # { 'Authorization': 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decode_token
    if auth_header 
      token = auth_header.split(' ')[1] #taking string and seperating into an array based on the argument
      # [{user_id: id}, {alg: XXXX}]
      JWT.decode(token, SECRET_KEY)[0]["user_id"]
    end
  end

  def current_user
    if decode_token # in order to login user u need to get decoded token 
      # decode_token=> [{"user_id"=>2}, {"alg"=>"HS256"}]
      # or nil if we can't decode the token
      @user = User.find_by!(id: decode_token)
    end
  end

  def logged_in?
    !!current_user
  end

  private

  # Dynamic error handling functions
  def render_not_found(exception)
    render json: {errors:"#{exception.model} not found"}, status: 404
  end

  def render_unprocessable(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_token_error
    nil
  end

  def authorize
    # Only allows actions to take place if user has a valid token, aka Logged In
    render json: { message: 'Unauthorized - Please log in' }, status: :unauthorized unless logged_in?
  end
end
