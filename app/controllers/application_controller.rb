class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found


  private 

  # Finds the User with the ID stored in the cookies with the key
  # :current_user_id This is a common way to handle user login in
  # a Rails application; logging in sets the cookies value and
  # logging out removes it.
  def current_user
    # if current user is nil/false assign cookies[:current_user_id]
    @current_user ||= cookies.encrypted[:current_user_id] &&
      User.find_by(id: cookies.encrypted[:current_user_id])
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless !!@current_user
  end

  # Dynamic error handling functions
  def render_not_found(exception)
    render json: {errors:"#{exception.model} not found"}, status: :not_found
  end

  def render_unprocessable(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
