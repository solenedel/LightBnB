-- ADD DATA TO USERS
INSERT INTO users (name, email, password)
VALUES ('Bob', 'bob@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Sally', 'sally@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Tom', 'tom@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- ADD DATA TO PROPERTIES
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(1, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 100, 1, 1, 1, 'Canada', 'street1', 'Vancouver', 'British Columbia', '28142', TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(2, 'Just a room', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 200, 2, 2, 2, 'Canada', 'street2', 'Vancouver', 'British Columbia', '28143', TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(3, 'the best place', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg', 300, 3, 3, 3, 'Canada', 'street3', 'Vancouver', 'British Columbia', '28144', TRUE);


-- ADD DATA TO RESERVATIONS
INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26');

INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (2, 2, '2019-01-04', '2019-02-01');

INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (3, 3, '2021-10-01', '2021-10-14');


-- INSERT DATA INTO PROPERTY REVIEWS
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 1, 'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 2, 'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 3, 3, 3, 'messages');