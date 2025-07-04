var admin = require("firebase-admin");

var serviceAccount = require("../../models/otpApplication.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin