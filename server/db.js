/**
 *   Creates our schema for storing our app's data. We create two folders,
 *   one to store users and one to store their messages.
 */

var knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './data/data.db' },
  useNullAsDefault: true
});

// var knex = require('knex')({         //Uncomment this to make this file work for heroku
//   client: 'postgresql',
//   connection: process.env.DATABASE_URL 
// });

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('username');
      table.string('password');
      table.timestamps();
    });
  }
});

knex.schema.hasTable('messages').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('messages', function (table) {
      table.increments();
      table.string('content');
      table.string('username');
      table.string('color');
      table.timestamps();
    });
  }
});

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
