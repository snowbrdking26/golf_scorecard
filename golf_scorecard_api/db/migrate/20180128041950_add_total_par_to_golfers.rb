class AddTotalParToGolfers < ActiveRecord::Migration[5.2]
  def change
    add_column :golfers, :totalpar, :integer
  end
end
