CREATE TABLE customers (
  customerId INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL
);

CREATE TABLE agents (
  agentId INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  areaCode INTEGER NOT NULL
);

CREATE TABLE admins (
  adminId INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL
);
