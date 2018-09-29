"use strict";

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
let projectId = 'YOUR KEY HERE';

// Creates a client
let datastore = new Datastore({
  projectId: projectId,
});

const db = {};

db.datastore = datastore;

module.exports = db;