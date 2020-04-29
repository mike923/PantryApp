const admin = require("firebase-admin")
// const serviceAccount = require("./fbServiceAccountKey.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-pantry.firebaseio.com"
});

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((eto) => {
        console.log(eto)
        res.locals.user_id = eto.uid
        res.locals.email = eto.email
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}

module.exports = {
  checkAuth
}