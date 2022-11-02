class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :city, :state, :lat, :lng, :party_size, :what, :when, :why, :image_url, :tags
  has_one :owner
  has_many :users
end
