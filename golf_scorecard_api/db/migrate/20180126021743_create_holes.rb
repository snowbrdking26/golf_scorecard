class CreateHoles < ActiveRecord::Migration[5.2]
  def change
    create_table :holes do |t|
      t.integer :holenumber
      t.integer :par
      t.integer :score

      t.timestamps
    end
  end
end
