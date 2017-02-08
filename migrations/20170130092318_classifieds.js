exports.up = function(knex, Promise) {
  return knex.schema.createTable("classifieds", function (table){
    table.increments();
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.decimal("price").notNullable();
    table.string("item_image", 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("classifieds");
};
