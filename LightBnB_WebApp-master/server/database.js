const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

// connect to LightBnB database
const pool = new Pool({
  user: 'vagrant', 
  password: '123',
  host: 'localhost', 
  database: 'lightbnb' 
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {

  return pool
  .query(`SELECT * FROM users
          WHERE email = $1`, [email])
  .then(result => {

    // if there is a user associated with the email, log them in
    if (result.rows[0]) return result.rows[0];

    // if there is no user for that email, return null
    else return null;     
    
  })
  .catch(error => console.log(error.message));
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  
  return pool
  .query(`SELECT * FROM users
          WHERE id = $1`, [id])
  .then(result => {

    // if there is a user associated with the id, remain logged in on refresh
    if (result.rows[0]) return result.rows[0];

    // if there is no user for that id, return null
    else return null;     
    
  })
  .catch(error => console.log(error.message));

  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  return pool
    .query(`INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *`, [user.name, user.email, user.password])
    .then(result => {

      // add new user to users database
      return result.rows;
    })
    .catch(error => console.log(error.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2); 
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  pool
  .query(`SELECT * FROM properties 
          LIMIT $1`, [limit])
  .then(result => console.log(result.rows))
  .catch(error => console.log(error.message))


  
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
