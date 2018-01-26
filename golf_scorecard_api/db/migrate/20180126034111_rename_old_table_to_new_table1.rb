class RenameOldTableToNewTable1 < ActiveRecord::Migration[5.2]
  def change
    rename_table :holes, :scorecards
  end
end
