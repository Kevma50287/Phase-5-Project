module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    SECRET_KEY = Rails.application.credentials.secret_key_base

    def connect
      self.current_user = find_verified_user
    end

    def decode_token(token)
      JWT.decode(token, SECRET_KEY)
    end

    private
      def find_verified_user
        token = decode_token(request.params[:token])
        # debugger
        user_id = token[0]["user_id"]
        if token 
          if current_user = User.find_by!(id: user_id)
            current_user
          else
            reject_unauthorized_connection
          end
        end
      end
  end
end
