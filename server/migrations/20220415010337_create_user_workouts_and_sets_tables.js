/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('workouts', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

    })
    .createTable('sets', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('workout_id').unsigned().notNullable();
        table.integer('exercise_id').notNullable();
        table.integer('weight').notNullable();
        table.integer('reps').notNullable();
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
            .foreign('workout_id')
            .references('id')
            .inTable('workouts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sets').dropTable('users').dropTable('workouts');
};
