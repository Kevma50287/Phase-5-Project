class User < ApplicationRecord
  has_one_attached :avatar
  has_secure_password
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :messages, dependent: :destroy
  has_many :participations, dependent: :destroy
  has_many :events, through: :participations
  has_many :hosted_events, class_name: "Event", foreign_key: :user_id, dependent: :destroy
  has_many :biography_blocks, dependent: :destroy

  validates_uniqueness_of :username, :email
  validates_presence_of :username, :email, :first_name, :last_name


  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end
end
