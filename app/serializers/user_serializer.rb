class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :last_name, :sex, :age, :state, :city, :lat, :lng, :preferences, :avatar_url
  has_many :friends
  has_many :events
  has_many :hosted_events
  has_many :biography_blocks

  # def avatar
  #   Rails.application.routes.url_helpers.url_for(object.avatar, only_path: true) if object.avatar.attached?
  # end
  
end
