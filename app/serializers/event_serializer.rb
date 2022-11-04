class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :city, :state, :lat, :lng, :party_size, :what, :when, :why, :image_url, :tags, :party_count, :users, :avatar_url
  has_one :host
  # has_many :users

  def party_count
    object.users.length
  end


  def users
    object.users 
  end
end
