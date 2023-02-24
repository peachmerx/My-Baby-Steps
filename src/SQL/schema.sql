DROP TABLE IF EXISTS baby_details;
DROP TABLE IF EXISTS immunisations;
DROP TABLE IF EXISTS users;

CREATE TABLE baby_details (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  hospital TEXT,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  weight INTEGER NOT NULL,
  length INTEGER NOT NULL,
  head_circumference INTEGER NOT NULL
);

CREATE TABLE immunisations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  birth BOOLEAN NOT NULL,
  two_months BOOLEAN NOT NULL,
  four_months BOOLEAN NOT NULL,
  six_months BOOLEAN NOT NULL,
  twelve_months BOOLEAN NOT NULL,
  eighteen_months BOOLEAN NOT NULL,
  four_years BOOLEAN NOT NULL,
  baby_id INTEGER REFERENCES baby_details(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expiry TIMESTAMP NOT NULL
);
