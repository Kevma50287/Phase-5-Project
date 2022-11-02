class AddLocationProperties < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :lat, :string
    add_column :users, :lng, :string
  end
end
