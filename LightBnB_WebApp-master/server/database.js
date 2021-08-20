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
  .catch(error => error.message);
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
  .catch(error => error.message);

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
    .catch(error => error.message);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool
  .query(`SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
          FROM reservations
          JOIN properties ON properties.id = reservations.property_id
          JOIN property_reviews ON properties.id = reservations.property_id
          WHERE reservations.guest_id = $1
          GROUP BY reservations.id, properties.id
          LIMIT $2`, [guest_id, limit])
  .then(result => result.rows)
  .catch(error => error.message);
  
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

  // array to hold parameters that MAY be entered in the query
  const queryParams = [];

  // array to hold each query filter
  const filters = [];


  // start query with info that comes before the WHERE clause
  let queryString = `SELECT properties.*, AVG(property_reviews.rating) AS average_rating
                      FROM properties
                      JOIN property_reviews ON properties.id = property_id
                      `;


    // if city is passed as an option, add city to params array
    // $${queryParams.length} represents the placeholder (ex. $1, $2, etc)
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      filters.push(`city LIKE $${queryParams.length}`);
    }

    // if owner_id is passed in, return only that owner's properties
    if (options.owner_id) {
      queryParams.push(`${owner_id}`);
      filters.push(`owner_id = $${queryParams.length}`);
    }

    // if a minimum price is entered
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`);
      filters.push(`cost_per_night >= $${queryParams.length}/100`);
    }
    
     // if a maximum price is entered
    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`);
      filters.push(`cost_per_night <= $${queryParams.length}/100`);
    }

    // if a minimum rating is passed in 
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      filters.push(`minimum_rating >= $${queryParams.length}`);
    } 
    //CHANGE TO AVERAG RATING

    // add the relevant filters to the query string, if applicable
    if (filters.length !== 0) {
      queryString += `WHERE ${filters[0]}`;

      if (filters.length > 1) {
        for (let i = 1; i < filters.length; i++) {
          queryString += `AND ${filters[i]}`;
        }
      }
    }


  // finally, push the limit to the end of queryParams
  queryParams.push(limit);
  
  // continue with the rest of the query after the WHERE c
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  //check
  console.log('queryString: ', queryString);
  console.log('queryParams: ', queryParams);

  return pool
  .query(queryString, queryParams)
  .then(result => result.rows)
  .catch(error => error.message)
  
};

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
