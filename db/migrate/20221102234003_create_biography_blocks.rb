class CreateBiographyBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :biography_blocks do |t|
      t.string :title
      t.string :content
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
