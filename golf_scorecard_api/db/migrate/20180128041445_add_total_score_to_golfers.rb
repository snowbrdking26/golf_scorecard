class AddTotalScoreToGolfers < ActiveRecord::Migration[5.2]
  def change
    add_column :golfers, :totalscore, :integer
  end
end
