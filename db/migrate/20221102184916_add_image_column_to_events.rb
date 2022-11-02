class AddImageColumnToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :image_url, :string
    add_column :events, :tags, :string, array: true, default: []
  end
end
