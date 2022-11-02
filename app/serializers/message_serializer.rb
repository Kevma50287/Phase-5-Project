class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :created_at
end
