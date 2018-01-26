class CreateGolfers < ActiveRecord::Migration[5.2]
  def change
    create_table :golfers do |t|
      t.string :course
      t.string :player

      t.timestamps
    end
  end
end
