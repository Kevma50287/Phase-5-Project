class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :location
      t.string :city
      t.string :state
      t.string :lat
      t.string :lng
      t.integer :party_size
      t.string :what
      t.datetime :when
      t.string :why
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
