class CreateGolfpros < ActiveRecord::Migration[6.1]
  def change
    create_table :golfpros do |t|
      t.string :name
      t.string :email
      t.string :bio

      t.timestamps
    end
  end
end
