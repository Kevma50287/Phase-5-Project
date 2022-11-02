class Event < ApplicationRecord
  belongs_to :host, :class_name => "User", :foreign_key => 'user_id'
  has_many :participations, dependent: :destroy
  has_many :users, through: :participations
end
