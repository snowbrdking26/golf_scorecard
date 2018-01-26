class AddForeignKeyToHoles < ActiveRecord::Migration[5.2]
  def change
    add_column :holes, :golfer_id, :integer
  end
end
