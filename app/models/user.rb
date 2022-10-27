class User < ApplicationRecord
  has_one_attached :avatar
  has_secure_password
  has_many :friendships
  has_many :friends, through: :friendships

  validates_uniqueness_of :username, :email
  validates_presence_of :username, :email, :first_name, :last_name

  def avatar_url
    Rails.application.routes.url_helpers.url_for(poster) if poster.attached?
  end
end
